const GeneralController = require("../../server/controllers/General.controller");
const { dbNoActions, dbNoSessionNoActions } = require("../db.mock.data");

const scaffold = require('../scaffold');

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('General Controller Tests', () => {
  beforeEach(async () => scaffold.populateDb({}))

  test('general [no stats]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(0);
    expect(general.sessionStructuralCount).toBe(0);
    expect(general.sessionTextualCount).toBe(0);
    expect(general.actionCount).toBe(0);
  })
})

describe('General Controller Tests', () => {
  beforeEach(async () => scaffold.populateDb())

  test('general', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(1);
    expect(general.sessionStructuralCount).toBe(1);
    expect(general.sessionTextualCount).toBe(1);
    expect(general.actionCount).toBe(5);
  })
})

describe('General Controller Tests', () => {
  beforeEach(async () => scaffold.populateDb(dbNoActions))

  test('general [no actions]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(1);
    expect(general.sessionStructuralCount).toBe(1);
    expect(general.sessionTextualCount).toBe(1);
    expect(general.actionCount).toBe(0);
  })
})

describe('General Controller Tests', () => {
  beforeEach(async () => scaffold.populateDb(dbNoSessionNoActions))

  test('general [no sessions no actions]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const general = await GeneralController.general(req, res);
    expect(general).toBeTruthy();
    expect(general.statCount).toBe(1);
    expect(general.sessionStructuralCount).toBe(0);
    expect(general.sessionTextualCount).toBe(0);
    expect(general.actionCount).toBe(0);
  })
})