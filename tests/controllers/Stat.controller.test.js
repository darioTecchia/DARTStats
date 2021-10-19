const models = require('../../server/models');
const Stat = models.Stat;

const StatController = require("../../server/controllers/Stat.controller");

const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Statistics Controller Tests', () => {
  test('create', async () => {
    const singleStat = await Stat.findById(stat._id.toString());
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(2);
  })

  test('findAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const stats = await StatController.findAll(req, res);
    expect(stats).toHaveLength(1);
  })

  test('findSessionsByStatId', async () => {
    const req = db.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = db.mockResponse();
    const sessions = await StatController.findSessionsByStatId(req, res);
    expect(sessions).toHaveLength(2);
  })

  test('findSessionsByStatId [wrong ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '616eeebed5c7c34614c36fba'
      }
    });
    const res = db.mockResponse();
    const sessions = await StatController.findSessionsByStatId(req, res);
    expect(sessions).toHaveLength(0);
  })

  test('findSessionsByStatId [invalid ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = db.mockResponse();
    await expect(StatController.findSessionsByStatId(req, res))
      .rejects
      .toThrow()
  })

  test('findActionsByStatId', async () => {
    const req = db.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = db.mockResponse();
    const sessions = await StatController.findActionsByStatId(req, res);
    expect(sessions).toHaveLength(5);
  })

  test('findActionsByStatId [wrong ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '616eeebed5c7c34614c36fba'
      }
    });
    const res = db.mockResponse();
    const sessions = await StatController.findActionsByStatId(req, res);
    expect(sessions).toHaveLength(0);
  })

  test('findActionsByStatId [invalid ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = db.mockResponse();
    await expect(StatController.findActionsByStatId(req, res))
      .rejects
      .toThrow()
  })

  test('findOne', async () => {
    const req = db.mockRequest({
      params: {
        id: stat._id
      }
    });
    const res = db.mockResponse();
    const singleStat = await StatController.findOne(req, res);
    expect(singleStat).toBeTruthy();
    expect(singleStat.sessions).toHaveLength(2);
    expect(singleStat.nOfExecutionTextual).toBe(1);
    expect(singleStat.nOfExecutionStructural).toBe(1);
    expect(singleStat.nOfTotalExecution).toBe(2);
  })

  test('findOne [wrong ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '616eeebed5c7c34614c36fba'
      }
    });
    const res = db.mockResponse();
    await expect(StatController.findOne(req, res))
      .rejects
      .toThrow()
  })

  test('findOne [invalid ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = db.mockResponse();
    await expect(StatController.findOne(req, res))
      .rejects
      .toThrow()
  })

  test('deleteAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const response = await StatController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 1 });
  })
})