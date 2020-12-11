const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Tree = require('../lib/models/trees');


describe('tests for app.js endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));
      
  afterAll(() => pool.end());


  // Sample test
  it('sample test to check connection', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ climb: 'the trees' });
      });

  });

  // Tree model tests: POST, GET all, GET one, PUT, DELETE
  it('create a new tree with POST', async() => {
    const res = await request(app)
      .post('/api/v1/trees')
      .send({
        treeSpecies: 'oak',
        rings: 105
      });

    expect(res.body).toEqual({
      id: '1',
      treeSpecies: 'oak',
      rings: 105
    });

  });

  it('get all trees with GET', async() => {
    const trees = await Promise.all([
      {
        treeSpecies: 'oak',
        rings: 105
      },
      {
        treeSpecies: 'redwood',
        rings: 675
      },
      {
        treeSpecies: 'elm',
        rings: 49
      }
    ].map(tree => Tree.insert(tree)));

    const res = await request(app)
      .get('/api/v1/trees');

    expect(res.body).toEqual(expect.arrayContaining(trees));
    expect(res.body).toHaveLength(trees.length);

  });

  it('get one flower via GET', async() => {
    const tree = await Tree.insert(
      {
        treeSpecies: 'elm',
        rings: 49
      }
    );

    const res = await request(app)
      .get(`/api/v1/trees/${tree.id}`);

    expect(res.body).toEqual(tree);
  });





});
