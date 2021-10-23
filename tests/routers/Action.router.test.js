const models = require('../../server/models');
const Action = models.Action;

const serverScaffold = require('../serverScaffold');
const supertest = require('supertest');

let stat, action, app;

beforeAll(async () => app = await serverScaffold.connect())
beforeEach(async () => stat = await serverScaffold.populateDb())
afterEach(async () => await serverScaffold.clearDatabase())
afterAll(async () => await serverScaffold.closeDatabase())

describe('Action API Find Test', () => {
  beforeEach(async () => {
    stat = await serverScaffold.populateDb()
    action = new Action({
      "actionKind": "REFACTORING_PREVIEW",
      "smellKind": "GENERAL_FIXTURE",
      "timestamp": 0,
      "className": "TestCreazioneAnnuncio",
      "methodName": "testCreazioneAnnuncio",
      "packageName": "gestioneAnnuncio",
      "actionCanceled": false,
      "actionDone": true,
      "statId": stat._id.toString(),
      "sessionId": "41224d776a326fb40f000001"
    });
    await action.save(action);
  });

  test('GET /api/action/:id', async () => {
    const response = await supertest(app)
      .get('/api/action/' + action._id.toString())
      .expect(200)
    expect(response.body).toBeTruthy();
    expect(response.body.actionKind).toBe("REFACTORING_PREVIEW");
    expect(response.body.smellKind).toBe("GENERAL_FIXTURE");
    expect(response.body.timestamp).toBe(0);
    expect(response.body.className).toBe("TestCreazioneAnnuncio");
    expect(response.body.methodName).toBe("testCreazioneAnnuncio");
    expect(response.body.packageName).toBe("gestioneAnnuncio");
    expect(response.body.actionCanceled).toBe(false);
    expect(response.body.actionDone).toBe(true);
    expect(response.body.statId.toString()).toBe(stat._id.toString());
    expect(response.body.sessionId.toString()).toBe("41224d776a326fb40f000001");
  })
})

describe('Action API Tests', () => {
  test('GET /api/action', async () => {
    const response = await supertest(app)
      .get('/api/action')
      .expect(200)
    expect(response.body).toHaveLength(5);
  })

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