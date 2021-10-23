const models = require('../../server/models');
const { dbNoActions } = require('../db.mock.data');
const Action = models.Action;
const scaffold = require('../scaffold');

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

let stat, action;

describe('Actions DAO tests', () => {
  beforeEach(async () => await scaffold.populateDb())

  test('Find all', async () => {
    const actions = await Action.find();
    expect(actions).toHaveLength(5);
  })

  test('Find one [wrong id]', async () => {
    const singleAction = await Action.findById("41224d776a326fb40f000001");
    expect(singleAction).toBeNull();
  })

  // test('Find one [invalid id]', async () => {
  //   expect(async () => { await Action.findById(123) }).toThrow();
  // })

  test('Delete all', async () => {
    await Action.deleteMany({});
    const actions = await Action.find();
    expect(actions).toHaveLength(0);
  })
})

describe('Actions DAO tests', () => {
  beforeEach(async () => await scaffold.populateDb(dbNoActions));

  test('Find all [No actions]', async () => {
    const actions = await Action.find();
    expect(actions).toHaveLength(0);
  })
})

describe('Actions DAO tests', () => {
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

  test('Find one', async () => {
    const singleAction = await Action.findById(action._id.toString());
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