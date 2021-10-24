const models = require('../../server/models');
const Action = models.Action;

const ActionController = require("../../server/controllers/Action.controller");

const scaffold = require('../scaffold');
const { dbNoActions } = require('../db.mock.data');

let stat, action;

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('Action Controller Tests', () => {
  beforeEach(async () => {
    stat = await scaffold.populateDb()
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

  test('findOne', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: action._id
      }
    });
    const res = scaffold.mockResponse();
    const singleAction = await ActionController.findOne(req, res);
    expect(singleAction).toBeTruthy();
    expect(singleAction.actionKind).toBe("REFACTORING_PREVIEW");
    expect(singleAction.smellKind).toBe("GENERAL_FIXTURE");
    expect(singleAction.timestamp).toBe(0);
    expect(singleAction.className).toBe("TestCreazioneAnnuncio");
    expect(singleAction.methodName).toBe("testCreazioneAnnuncio");
    expect(singleAction.packageName).toBe("gestioneAnnuncio");
    expect(singleAction.actionCanceled).toBe(false);
    expect(singleAction.actionDone).toBe(true);
    expect(singleAction.statId.toString()).toBe(stat._id.toString());
    expect(singleAction.sessionId.toString()).toBe("41224d776a326fb40f000001");
  })
})

describe('Action Controller Tests', () => {
  beforeEach(async () => await scaffold.populateDb(dbNoActions))

  test('findAll [No actions]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const actions = await ActionController.findAll(req, res);
    expect(actions).toHaveLength(0);
  })
})

describe('Action Controller Tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('findAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const actions = await ActionController.findAll(req, res);
    expect(actions).toHaveLength(5);
  })

  test('findOne [wrong ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '41224d776a326fb40f000001'
      }
    });
    const res = scaffold.mockResponse();
    const result = await ActionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('findOne [invalid ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = scaffold.mockResponse();
    const result = await ActionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('deleteAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const response = await ActionController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 5 });
  })
})