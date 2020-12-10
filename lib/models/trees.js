module.exports = class Tree {

    id;
    treeSpecies;
    rings;

    constructor(row) {
      this.id = row.id;
      this.treeSpecies = row.tree_species;
      this.rings = row.rings;        
    }
}