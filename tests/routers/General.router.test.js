const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');
const { dbNoActions, dbNoSessionNoActions } = require('../db.mock.data');

let stat, app;

beforeAll(async () => app = await serverScaffold.connect())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Statistics API Tests', () => {
  beforeEach(async () => serverScaffold.populateDb({}))

  test('GET /api/general [no stats]', async () => {
    const response = await supertest(app)
      .get('/api/general')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.statCount).toBe(0);
    expect(response.body.sessionStructuralCount).toBe(0);
    expect(response.body.sessionTextualCount).toBe(0);
    expect(response.body.actionCount).toBe(0);
  })
})

describe('Statistics API Tests', () => {
  beforeEach(async () => serverScaffold.populateDb())

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

describe('Statistics API Tests', () => {
  beforeEach(async () => serverScaffold.populateDb(dbNoActions))

  test('GET /api/general [no actions]', async () => {
    const response = await supertest(app)
      .get('/api/general')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.statCount).toBe(1);
    expect(response.body.sessionStructuralCount).toBe(1);
    expect(response.body.sessionTextualCount).toBe(1);
    expect(response.body.actionCount).toBe(0);
  })
})

describe('Statistics API Tests', () => {
  beforeEach(async () => serverScaffold.populateDb(dbNoSessionNoActions))

  test('GET /api/general [no actions no sessions]', async () => {
    const response = await supertest(app)
      .get('/api/general')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.statCount).toBe(1);
    expect(response.body.sessionStructuralCount).toBe(0);
    expect(response.body.sessionTextualCount).toBe(0);
    expect(response.body.actionCount).toBe(0);
  })
})