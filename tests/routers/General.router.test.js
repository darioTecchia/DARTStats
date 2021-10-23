const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');

let stat, app;

beforeAll(async () => app = await serverScaffold.connect())
beforeEach(async () => stat = await serverScaffold.crateStat())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

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