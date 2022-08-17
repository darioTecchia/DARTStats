const models = require('../../server/models');
const { dbNoSessionNoActions } = require('../db.mock.data');
const Session = models.Session;
const scaffold = require('../scaffold');

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

let stat, session;

describe('Sessions DAO tests', () => {
  beforeEach(async () => await scaffold.populateDb())

  test('Find all', async () => {
    const sessions = await Session.find();
    expect(sessions).toHaveLength(2);
  })

  test('Find one [wrong id]', async () => {
    const singleSession = await Session.findById("41224d776a326fb40f000001");
    expect(singleSession).toBeNull();
  })

  // test('Find one [invalid id]', async () => {
  //   expect(async () => { await Session.findById(123) }).toThrow();
  // })

  test('Delete all', async () => {
    await Session.deleteMany({});
    const sessions = await Session.find();
    expect(sessions).toHaveLength(0);
  })
})

describe('Sessions DAO tests', () => {
  beforeEach(async () => await scaffold.populateDb(dbNoSessionNoActions));

  test('Find all [No sessions]', async () => {
    const sessions = await Session.find();
    expect(sessions).toHaveLength(0);
  })
})

describe('Sessions DAO tests', () => {
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

  test('Find one', async () => {
    const singleSession = await Session.findById(session._id.toString());
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