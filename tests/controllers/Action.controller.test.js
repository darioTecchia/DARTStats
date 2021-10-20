const models = require('../../server/models');
const Action = models.Action;

const ActionController = require("../../server/controllers/Action.controller");

const db = require('../db');

let stat;

beforeAll(async () => await db.connect())
beforeEach(async () => stat = await db.crateStat())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Action Controller Tests', () => {

  test('findAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const actions = await ActionController.findAll(req, res);
    expect(actions).toHaveLength(5);
  })

  // test('findOne', async () => {


  //   const req = db.mockRequest({
  //     params: {
  //       id: stat._id
  //     }
  //   });
  //   const res = db.mockResponse();
  //   const singleStat = await ActionController.findOne(req, res);
  //   expect(singleStat).toBeTruthy();
  //   expect(singleStat.sessions).toHaveLength(2);
  //   expect(singleStat.nOfExecutionTextual).toBe(1);
  //   expect(singleStat.nOfExecutionStructural).toBe(1);
  //   expect(singleStat.nOfTotalExecution).toBe(2);
  // })

  test('findOne [wrong ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '41224d776a326fb40f000001'
      }
    });
    const res = db.mockResponse();
    const result = await ActionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('findOne [invalid ID]', async () => {
    const req = db.mockRequest({
      params: {
        id: '123'
      }
    });
    const res = db.mockResponse();
    const result = await ActionController.findOne(req, res);
    expect(result).toBeNull();
  })

  test('deleteAll', async () => {
    const req = db.mockRequest();
    const res = db.mockResponse();
    const response = await ActionController.deleteAll(req, res);
    expect(response).toMatchObject({ deleted: 5 });
  })
})