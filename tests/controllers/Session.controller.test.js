const models = require('../../server/models');
const Session = models.Session;

const SessionController = require("../../server/controllers/Session.controller");

const scaffold = require('../scaffold');
const { dbNoSessionNoActions } = require('../db.mock.data');

let stat, session;

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('Session Controller Tests', () => {
  beforeEach(async () => await scaffold.populateDb(dbNoSessionNoActions))

  test('findAll [No sessions]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const sessions = await SessionController.findAll(req, res);
    expect(sessions).toHaveLength(0);
  })
})

describe('Session Controller Tests', () => {
  beforeEach(async () => {
    stat = await scaffold.populateDb()
    session = new Session({
      "userId": "851B0DF4C83AAC9273C014C57B127AF7",
      "projectName": "SorrentoMarina",
      "startTime": 1630919595704,
      "endTime": 1630919638780,
      "nOfGF": 61,
      "nOfET": 27,
      "nOfLOC": 61,
      "nOfHCTD": 5,
      "nOfMG": 10,
      "nOfTCD": 20,
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

  test('findOne', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: session._id
      }
    });
    const res = scaffold.mockResponse();
    const singleSession = await SessionController.findOne(req, res);
    expect(singleSession).toBeTruthy();
    expect(singleSession.userId).toBe("851B0DF4C83AAC9273C014C57B127AF7");
    expect(singleSession.projectName).toBe("SorrentoMarina");
    expect(singleSession.startTime).toBe(1630919595704);
    expect(singleSession.endTime).toBe(1630919638780);
    expect(singleSession.nOfGF).toBe(61);
    expect(singleSession.nOfET).toBe(27);
    expect(singleSession.nOfLOC).toBe(61);
    expect(singleSession.nOfHCTD).toBe(5);
    expect(singleSession.nOfMG).toBe(10);
    expect(singleSession.nOfTCD).toBe(20);
    expect(singleSession.nOfTotalClasses).toBe(167);
    expect(singleSession.kind).toBe("Textual");
    expect(singleSession.statId.toString()).toBe(stat._id.toString());
    expect(singleSession.actions).toHaveLength(2);
  })
})

describe('Session Controller Tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('findAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const sessions = await SessionController.findAll(req, res);
    expect(sessions).toHaveLength(2);
  })

  test('findOne [wrong ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '41224d776a326fb40f000001'
      }
    });
    const res = scaffold.mockResponse();
    const result = await SessionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('findOne [invalid ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = scaffold.mockResponse();
    const result = await SessionController.findOne(req, res)
    expect(result).toBeNull();
  })

  test('deleteAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const response = await SessionController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 2 });
  })
})