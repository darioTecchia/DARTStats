const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');

let stat, app;

beforeAll(async () => app = await serverScaffold.connect())
beforeEach(async () => stat = await serverScaffold.populateDb())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Session API Tests', () => {
  test('GET /api/action', async () => {
    const response = await supertest(app)
      .get('/api/action')
      .expect(200)
    expect(response.body).toHaveLength(5);
  })

  // test('GET /api/action/:id', async () => {
  //   const response = await supertest(app)
  //     .get('/api/action/' + stat._id.toString())
  //     .expect(200)
  //   expect(response.body).toBeTruthy();
  //   expect(response.body.sessions).toHaveLength(2);
  //   expect(response.body.nOfExecutionTextual).toBe(1);
  //   expect(response.body.nOfExecutionStructural).toBe(1);
  //   expect(response.body.nOfTotalExecution).toBe(2);
  // })

  test('GET /api/action/:id [wrong ID]', async () => {
    const response = await supertest(app)
      .get('/api/action/41224d776a326fb40f000001')
      .expect(404);
  })

  test('GET /api/action/:id [invalid ID]', async () => {
    const response = await supertest(app)
      .get('/api/action/123')
      .expect(500);
  })

  test('DELETE /api/action', async () => {
    const response = await supertest(app)
      .delete('/api/action')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.message).toBe('5 Actions were deleted successfully!')
  })
})