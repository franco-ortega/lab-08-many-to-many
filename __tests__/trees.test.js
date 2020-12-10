const request = require('supertest');
const app = require('../lib/app');

describe('tests for app.js endpoints', () => {

// Sample test
  it('sample test to check connection', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ climb: 'the trees' });
      });

  });
});
