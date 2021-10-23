const models = require('../../server/models');
const Session = models.Session;
const scaffold = require('../scaffold');

let stat;

beforeAll(async () => await scaffold.connect())
beforeEach(async () => stat = await scaffold.populateDb())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('Actions DAO find tests', () => {
  test('Find all', async () => {
    const sessions = await Session.find();
    expect(sessions).toHaveLength(2);
  })
})

describe('Actions DAO delete tests', () => {
  test('Delete all', async () => {
    await Session.deleteMany({});
    const sessions = await Session.find();
    expect(sessions).toHaveLength(0);
  })
})