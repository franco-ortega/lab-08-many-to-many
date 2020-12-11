const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

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

  // Bird tests: POST, GET all, GET one, PUT, DELETE
  it('create a new bird with POST', async() => {
    const res = await request(app)
      .post('/api/v1/birds')
      .send({
        birdSpecies: 'tiger owl',
        color: 'red'
      });
  
    expect(res.body).toEqual({
      id: '1',
      birdSpecies: 'tiger owl',
      color: 'red'
    });
  });
  




});
