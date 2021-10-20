const models = require('../../server/models');
const Action = models.Action;
const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Actions DAO find tests', () => {
  test('Find all', async () => {
    const actions = await Action.find();
    expect(actions).toHaveLength(5);
  })
})

describe('Actions DAO delete tests', () => {
  test('Delete all', async () => {
    await Action.deleteMany({});
    const actions = await Action.find();
    expect(actions).toHaveLength(0);
  })
})