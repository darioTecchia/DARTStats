const models = require('../../server/models');
const Stat = models.Stat;

const StatController = require("../../server/controllers/Stat.controller");

const scaffold = require('../scaffold');
const { dbNoSessionNoActions } = require('../db.mock.data');

let stat;

beforeAll(async () => await scaffold.connect())
afterEach(async () => await scaffold.clearDatabase())
afterAll(async () => await scaffold.closeDatabase())

describe('Statistics Controller Tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb({}))

  test('findAll [No stats]', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const stats = await StatController.findAll(req, res);
    expect(stats).toHaveLength(0);
  })
})

describe('Statistics Controller Tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb(dbNoSessionNoActions))

  test('findOne [no actions no sessions]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = scaffold.mockResponse();
    const singleStat = await StatController.findOne(req, res);
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(singleStat.nOfExecutionTextual + singleStat.nOfExecutionStructural);
    expect(singleStat.nOfExecutionTextual).toBe(0);
    expect(singleStat.nOfExecutionStructural).toBe(0);
    expect(singleStat.nOfTotalExecution).toBe(singleStat.nOfExecutionTextual + singleStat.nOfExecutionStructural);
  })
})

describe('Statistics Controller Tests', () => {
  beforeEach(async () => stat = await scaffold.populateDb())

  test('create', async () => {
    const singleStat = await Stat.findById(stat._id.toString());
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(2);
  })

  test('findAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const stats = await StatController.findAll(req, res);
    expect(stats).toHaveLength(1);
  })

  test('findSessionsByStatId', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = scaffold.mockResponse();
    const sessions = await StatController.findSessionsByStatId(req, res);
    expect(sessions).toHaveLength(2);
  })

  test('findSessionsByStatId [wrong ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '616eeebed5c7c34614c36fba'
      }
    });
    const res = scaffold.mockResponse();
    const sessions = await StatController.findSessionsByStatId(req, res);
    expect(sessions).toHaveLength(0);
  })

  test('findSessionsByStatId [invalid ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = scaffold.mockResponse();
    const result = await StatController.findSessionsByStatId(req, res);
    expect(result).toBeNull();
  })

  test('findActionsByStatId', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = scaffold.mockResponse();
    const sessions = await StatController.findActionsByStatId(req, res);
    expect(sessions).toHaveLength(5);
  })

  test('findActionsByStatId [wrong ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '616eeebed5c7c34614c36fba'
      }
    });
    const res = scaffold.mockResponse();
    const sessions = await StatController.findActionsByStatId(req, res);
    expect(sessions).toHaveLength(0);
  })

  test('findActionsByStatId [invalid ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = scaffold.mockResponse();
    const result = await StatController.findActionsByStatId(req, res);
    expect(result).toBeNull();
  })

  test('findOne', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = scaffold.mockResponse();
    const singleStat = await StatController.findOne(req, res);
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(singleStat.nOfExecutionTextual + singleStat.nOfExecutionStructural);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(singleStat.nOfExecutionTextual + singleStat.nOfExecutionStructural);
  })

  test('findOne [wrong ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '41224d776a326fb40f000001'
      }
    });
    const res = scaffold.mockResponse();
    const result = await StatController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('findOne [invalid ID]', async () => {
    const req = scaffold.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = scaffold.mockResponse();
    const result = await StatController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('deleteAll', async () => {
    const req = scaffold.mockRequest();
    const res = scaffold.mockResponse();
    const response = await StatController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 1 });
  })
})