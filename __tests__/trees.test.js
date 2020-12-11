const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
//const Tree = require('../lib/models/trees');


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

  it('create a new tree with POST', async() => {
    const res = await request(app)
      .post('/api/v1/trees')
      .send({
        treeSpecies: 'oak',
        rings: 105
      });
console.log(res.body);
    expect(res.body).toEqual({
      id: '1',
      treeSpecies: 'oak',
      rings: 105
    });

  });




});
