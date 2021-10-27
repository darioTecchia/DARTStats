const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');
const models = require('../../server/models');
const Stat = models.Stat;

const reqBody = require('../db.mock.data').dbDefault;
const { dbNoSessionNoActions, dbEmpty } = require('../db.mock.data');

let stat, app;

beforeAll(async () => app = await serverScaffold.connect())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Statistics API Tests', () => {
  beforeEach(async () => await serverScaffold.populateDb(dbEmpty))

  test('Find all [No stat]', async () => {
    const response = await supertest(app)
      .get('/api/stat')
      .expect(200)
    expect(response.body).toHaveLength(0);
  })
});

describe('Statistics API Tests', () => {
  beforeEach(async () => stat = await serverScaffold.populateDb())

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

  test('DELETE /api/stat', async () => {
    const response = await supertest(app)
      .delete('/api/stat')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.message).toBe('1 Stats were deleted successfully!')
  })
})

describe('Statistics API Tests', () => {
  beforeEach(async () => stat = await serverScaffold.populateDb(dbNoSessionNoActions))

  test('GET /api/stat/:id [no actions no sessions]', async () => {
    const response = await supertest(app)
      .get('/api/stat/' + stat._id.toString())
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.sessions).toHaveLength(response.body.nOfExecutionTextual + response.body.nOfExecutionStructural);
    expect(response.body.nOfExecutionTextual).toBe(0);
    expect(response.body.nOfExecutionStructural).toBe(0);
    expect(response.body.nOfTotalExecution).toBe(response.body.nOfExecutionTextual + response.body.nOfExecutionStructural);
  })
});