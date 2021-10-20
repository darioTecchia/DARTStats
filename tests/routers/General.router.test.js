const testServer = require('../testServer');
const supertest = require('supertest');

let stat, app;

beforeAll(async () => app = await testServer.connect())
beforeEach(async () => stat = await testServer.crateStat())
afterEach(async () => await testServer.clearDatabase())
afterAll(async () => await testServer.closeDatabase())

describe('Statistics API Tests', () => {
  test('GET /api/general', async () => {
    const response = await supertest(app)
      .get('/api/general')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.statCount).toBe(1);
    expect(response.body.sessionStructuralCount).toBe(1);
    expect(response.body.sessionTextualCount).toBe(1);
    expect(response.body.actionCount).toBe(5);
  })
})