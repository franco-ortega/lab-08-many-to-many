const pool = require('../utils/pool');

module.exports = class Bird {
    id;
    birdSpecies;
    color;

    constructor(row) {
      this.id = String(row.id);
      this.birdSpecies = row.bird_species;
      this.color = row.color;
    }

    // Create
    static async insert({ birdSpecies, color }) {
      const { rows } = await pool.query(
        'INSERT INTO birds (bird_species, color) VALUES ($1, $2) RETURNING *',
        [birdSpecies, color]
      );
      
      return new Bird(rows[0]);
    }



};
