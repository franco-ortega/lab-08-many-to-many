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

    // Read
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM birds');
      
      return rows.map(row => new Bird(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM birds WHERE id=$1',
        [id]);
  
      return new Bird(rows[0]);
    }

    // Update
    static async update(id, { birdSpecies, color }) {
      const { rows } = await pool.query(
        `UPDATE birds
                  SET
                    bird_species=$1,
                    color=$2
                  WHERE id=$3
                  RETURNING *`,
        [birdSpecies, color, id]
      );
      
      return new Bird(rows[0]);
    }

    // Delete
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM birds WHERE id=$1 RETURNING *',
        [id]);
        
      return new Bird(rows[0]);
    }

};
