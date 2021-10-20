const models = require('../../server/models');
const Session = models.Session;
const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

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