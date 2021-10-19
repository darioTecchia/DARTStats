const GeneralController = require("../../server/controllers/General.controller");

const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('General Controller Tests', () => {

  test('general', async () => {
    const req = db.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = db.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(1);
    expect(general.sessionStructuralCount).toBe(1);
    expect(general.sessionTextualCount).toBe(1);
    expect(general.actionCount).toBe(5);
  })
})