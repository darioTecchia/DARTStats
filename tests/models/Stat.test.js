const models = require('../../server/models');
const Stat = models.Stat;
const scaffold = require('../scaffold');

let stat;

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('Statistics DAO tests', () => {
  beforeEach(async () => await scaffold.populateDb({}))

  test('Find all [No stat]', async () => {
    const stats = await Stat.find();
    expect(stats).toHaveLength(0);
  })
});

describe('Statistics DAO tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('Find all', async () => {
    const stats = await Stat.find();
    expect(stats).toHaveLength(1);
  })

  test('Find one by ID', async () => {
    const singleStat = await Stat.findById(stat._id.toString());
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(2);
  })

  test('Find one by ID (wrong ID)', async () => {
    const singleStat = await Stat.findById('616ed60360278d2d183fc111');
    expect(singleStat).not.toBeTruthy();
  })
})

describe('Statistics DAO tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('Delete all', async () => {
    await Stat.deleteMany({});
    const stats = await Stat.find();
    expect(stats).toHaveLength(0);
  })
})

describe('Statistics DAO tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('Create one', async () => {
    let newStat = new Stat({
      "nOfExecutionTextual": 2,
      "nOfExecutionStructural": 1,
      "sessions": ['616ed60360278d2d183fc111', '616ed60360278d2d183fc112']
    });
    await newStat.save(newStat);

    const singleStat = await Stat.findById(newStat._id.toString());
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(2);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(3);
  })
})