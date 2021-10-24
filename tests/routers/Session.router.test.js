const models = require('../../server/models');
const Session = models.Session;

const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');
const { dbNoSessionNoActions } = require('../db.mock.data');

let stat, session, app;

beforeAll(async () => app = await serverScaffold.connect())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Session API Tests', () => {
  beforeEach(async () => {
    stat = await serverScaffold.populateDb()
    session = new Session({
      "userId": "851B0DF4C83AAC9273C014C57B127AF7",
      "projectName": "SorrentoMarina",
      "startTime": 1630919595704,
      "endTime": 1630919638780,
      "nOfGF": 61,
      "nOfET": 27,
      "nOfLOC": 61,
      "nOfTotalClasses": 167,
      "kind": "Textual",
      "statId": stat._id.toString(),
      "actions": [
        "41224d776a326fb40f000001",
        "41224d776a326fb40f000002"
      ]
    });
    await session.save(session);
  });

  test('GET /api/session/:id', async () => {
    const response = await supertest(app)
      .get('/api/session/' + session._id.toString())
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.userId).toBe("851B0DF4C83AAC9273C014C57B127AF7");
    expect(response.body.projectName).toBe("SorrentoMarina");
    expect(response.body.startTime).toBe(1630919595704);
    expect(response.body.endTime).toBe(1630919638780);
    expect(response.body.nOfGF).toBe(61);
    expect(response.body.nOfET).toBe(27);
    expect(response.body.nOfLOC).toBe(61);
    expect(response.body.nOfTotalClasses).toBe(167);
    expect(response.body.kind).toBe("Textual");
    expect(response.body.statId.toString()).toBe(stat._id.toString());
    expect(response.body.actions).toHaveLength(2);
  })
})

describe('Session API Tests', () => {
  beforeEach(async () => serverScaffold.populateDb(dbNoSessionNoActions))

  test('GET /api/session [no sessions]', async () => {
    const response = await supertest(app)
      .get('/api/session')
      .expect(200)
    expect(response.body).toHaveLength(0);
  })
})

describe('Session API Tests', () => {
  beforeEach(async () => stat = await serverScaffold.populateDb())

  test('GET /api/session', async () => {
    const response = await supertest(app)
      .get('/api/session')
      .expect(200)
    expect(response.body).toHaveLength(2);
  })

  test('GET /api/session/:id [wrong ID]', async () => {
    const response = await supertest(app)
      .get('/api/session/41224d776a326fb40f000001')
      .expect(404);
  })

  test('GET /api/session/:id [invalid ID]', async () => {
    const response = await supertest(app)
      .get('/api/session/123')
      .expect(500);
  })

  test('DELETE /api/session', async () => {
    const response = await supertest(app)
      .delete('/api/session')
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.message).toBe('2 Sessions were deleted successfully!')
  })
})