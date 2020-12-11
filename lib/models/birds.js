module.exports = class Bird {
    id;
    birdSpecies;
    color;

    constructor(row) {
      this.id = String(row.id);
      this.birdSpecies = row.bird_species;
      this.color = String(row.color);
    }

};
