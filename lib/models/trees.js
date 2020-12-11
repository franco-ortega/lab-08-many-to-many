const pool = require('../utils/pool');

module.exports = class Tree {
    id;
    treeSpecies;
    rings;

    constructor(row) {
      this.id = String(row.id);
      this.treeSpecies = row.tree_species;
      this.rings = row.rings;        
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
    
};

