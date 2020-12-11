const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Bird = require('../lib/models/birds');
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

  it('get all birds with GET', async() => {
    const birds = await Promise.all([
      {
        birdSpecies: 'tiger owl',
        color: 'red'
      },
      {
        birdSpecies: 'spotted vulture',
        color: 'grey and orange'
      },
      {
        birdSpecies: 'hummingbird',
        color: 'purple'
      }
    ].map(bird => Bird.insert(bird)));

    const res = await request(app)
      .get('/api/v1/birds');

    expect(res.body).toEqual(expect.arrayContaining(birds));
    expect(res.body).toHaveLength(birds.length);
  });

  it('get one bird via GET', async() => {
    const bird = await Bird.insert(
      {
        birdSpecies: 'spotted vulture',
        color: 'grey and orange'
      }
    );

    const res = await request(app)
      .get(`/api/v1/birds/${bird.id}`);

    expect(res.body).toEqual(bird);
  });


  it('update one bird via PUT', async() => {
    const bird = await Bird.insert(
      {
        birdSpecies: 'hummingbird',
        color: 'purple'
      }
    );

    const res = await request(app)
      .put(`/api/v1/birds/${bird.id}`)
      .send(
        {
          birdSpecies: 'hummingbird',
          color: 'green'
        }
      );

    expect(res.body).toEqual(
      {
        ...bird,
        birdSpecies: 'hummingbird',
        color: 'green'
      }
    );
  });

  it('delete one bird via DELETE', async() => {
    const bird = await Bird.insert(
      {
        birdSpecies: 'hummingbird',
        color: 'purple'
      }
    );

    const res = await request(app)
      .delete(`/api/v1/birds/${bird.id}`);

    expect(res.body).toEqual(bird);
  });





  




});
