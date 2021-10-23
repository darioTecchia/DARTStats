const GeneralController = require("../../server/controllers/General.controller");

const scaffold = require('../scaffold');

let stat;

beforeAll(async () => await scaffold.connect())
beforeEach(async () => stat = await scaffold.populateDb())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('General Controller Tests', () => {

  test('general', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = scaffold.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(1);
    expect(general.sessionStructuralCount).toBe(1);
    expect(general.sessionTextualCount).toBe(1);
    expect(general.actionCount).toBe(5);
  })
})