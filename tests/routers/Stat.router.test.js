const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');
const models = require('../../server/models');
const Stat = models.Stat;

const reqBody = require('../db.mock.data').dbDefault;

let stat, app;

beforeAll(async () => app = await serverScaffold.connect())
beforeEach(async () => stat = await serverScaffold.populateDb())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Statistics API Tests', () => {
  test('POST /api/stat', async () => {
    const response = await supertest(app)
      .post('/api/stat')
      .send(reqBody)
      .expect(200)

    const singleStat = await Stat.findById(response.body._id.toString());
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(2);
  })

  test('GET /api/stat', async () => {
    const response = await supertest(app)
      .get('/api/stat')
      .expect(200)
    expect(response.body).toHaveLength(1);
  })

  test('GET /api/stat/:id/sessions', async () => {
    const response = await supertest(app)
      .get('/api/stat/' + stat._id.toString() + '/sessions')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveLength(2);
  })

  test('GET /api/stat/:id/sessions [wrong ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/41224d776a326fb40f000001/sessions')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveLength(0);
  })

  test('GET /api/stat/:id/sessions [invalid ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/123/sessions')
      .expect(500);
  })

  test('GET /api/stat/:id/actions', async () => {
    const response = await supertest(app)
      .get('/api/stat/' + stat._id.toString() + '/actions')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveLength(5);
  })

  test('GET /api/stat/:id/actions [wrong ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/41224d776a326fb40f000001/actions')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveLength(0);
  })

  test('GET /api/stat/:id/actions [invalid ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/123/actions')
      .expect(500);
  })

  test('GET /api/stat/:id', async () => {
    const response = await supertest(app)
      .get('/api/stat/' + stat._id.toString())
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.sessions).toHaveLength(2);
    expect(response.body.nOfExecutionTextual).toBe(1);
    expect(response.body.nOfExecutionStructural).toBe(1);
    expect(response.body.nOfTotalExecution).toBe(2);
  })

  test('GET /api/stat/:id [wrong ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/41224d776a326fb40f000001')
      .expect(404);
  })

  test('GET /api/stat/:id [invalid ID]', async () => {
    const response = await supertest(app)
      .get('/api/stat/123')
      .expect(500);
  })

  test('DELETE /api/stat', async () => {
    const response = await supertest(app)
      .delete('/api/stat')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.message).toBe('1 Stats were deleted successfully!')
  })
})