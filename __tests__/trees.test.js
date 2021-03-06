const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Tree = require('../lib/models/trees');
const Bird = require('../lib/models/birds');

describe('tests for app.js endpoints', () => {
  beforeEach(() => pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8')));
      
  afterAll(() => pool.end());

  // Tree tests: POST, GET all, GET one, PUT, DELETE
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
      rings: '105'
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

  it('get one tree JOINed with birds via GET', async() => {
    await Promise.all([
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

    const tree = await Tree.insert(
      {
        treeSpecies: 'elm',
        rings: 49,
        birds: ['tiger owl', 'spotted vulture', 'hummingbird']
      }
    );

    const res = await request(app)
      .get(`/api/v1/trees/${tree.id}`);

    expect(res.body).toEqual({
      ...tree,
      birds: expect.arrayContaining(['tiger owl', 'spotted vulture', 'hummingbird'])
    });
  });

  it('update one tree via PUT', async() => {
    const tree = await Tree.insert(
      {
        treeSpecies: 'redwood',
        rings: 675
      }
    );

    const res = await request(app)
      .put(`/api/v1/trees/${tree.id}`)
      .send(
        {
          treeSpecies: 'redwood',
          rings: 999
        }
      );

    expect(res.body).toEqual(
      {
        ...tree,
        treeSpecies: 'redwood',
        rings: '999'
      }
    );
  });

  it('delete one tree via DELETE', async() => {
    const tree = await Tree.insert(
      {
        treeSpecies: 'elm',
        rings: 49
      }
    );

    const res = await request(app)
      .delete(`/api/v1/trees/${tree.id}`);

    expect(res.body).toEqual(tree);
  });

});
