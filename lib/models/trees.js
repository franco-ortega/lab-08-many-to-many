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
    static async insert({ treeSpecies, rings }) {
      const { rows } = await pool.query(
        'INSERT INTO trees (tree_species, rings) VALUES ($1, $2) RETURNING *',
        [treeSpecies, rings]
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
        'SELECT * FROM trees WHERE id=$1',
        [id]);

      return new Tree(rows[0]);
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

