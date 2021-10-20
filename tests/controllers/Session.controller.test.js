const models = require('../../server/models');
const Session = models.Session;

const SessionController = require("../../server/controllers/Session.controller");

const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Session Controller Tests', () => {

  test('findAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const sessions = await SessionController.findAll(req, res);
    expect(sessions).toHaveLength(2);
  })

  test('findOne [wrong ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '41224d776a326fb40f000001'
      }
    });
    const res = db.mockResponse();
    const result = await SessionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('findOne [invalid ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = db.mockResponse();
    await expect(SessionController.findOne(req, res))
      .rejects
      .toThrow()
  })

  test('deleteAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const response = await SessionController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 2 });
  })
})