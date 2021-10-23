const models = require('../../server/models');
const Action = models.Action;
const scaffold = require('../scaffold');

let stat;

beforeAll(async () => await scaffold.connect())
beforeEach(async () => stat = await scaffold.crateStat())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

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