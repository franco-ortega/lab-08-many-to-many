const pool = require('../utils/pool');

module.exports = class Tree {
    id;
    treeSpecies;
    rings;

    constructor(row) {
      this.id = String(row.id);
      this.treeSpecies = row.tree_species;
      this.rings = String(row.rings);
    }
    
    // Create
    static async insert({ treeSpecies, rings, birds = [] }) {
      const { rows } = await pool.query(
        'INSERT INTO trees (tree_species, rings) VALUES ($1, $2) RETURNING *',
        [treeSpecies, rings]
      );

      await pool.query(
        `INSERT INTO trees_birds (tree_id, bird_id)
        SELECT ${rows[0].id}, id FROM birds WHERE bird_species = ANY($1::text[])`,
        [birds]
      );

      return new Tree(rows[0]);
    }

    // Read
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM trees');

      return rows.map(row => new Tree(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT
            trees.*,
            array_agg(birds.bird_species) AS birds
         FROM
            trees_birds
          JOIN trees
          ON trees_birds.tree_id = trees.id
          JOIN birds
          ON trees_birds.bird_id = birds.id
          WHERE trees.id=$1
          GROUP BY trees.id`,
        [id]);

      if(!rows[0]) throw new Error(`No tree found for id ${id}`);

      return {
        ...new Tree(rows[0]),
        birds: rows[0].birds
      };
    }

    // Update
    static async update(id, { treeSpecies, rings }) {
      const { rows } = await pool.query(
        `UPDATE trees
            SET
              tree_species=$1,
              rings=$2
            WHERE id=$3
            RETURNING *`,
        [treeSpecies, rings, id]
      );

      return new Tree(rows[0]);
    }

    // Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM trees WHERE id=$1 RETURNING *',
        [id]);
  
      return new Tree(rows[0]);
    }
    
};

