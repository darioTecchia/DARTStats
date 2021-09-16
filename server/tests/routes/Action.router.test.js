const app = require('../../server');
const db = require("../../models");
const Action = db.Action;

const supertest = require("supertest");
const mongoose = require("mongoose");

beforeEach((done) => {
  mongoose.connect(db.testUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test("GET /api/action", async () => {
  const action = await Action.create({
    actionKind: "String",
    smellKind: "String",
    timestamp: 1,
    className: "String",
    methodName: "String",
    packageName: "String",
    actionCanceled: true,
    actionDone: true
  });

  await supertest(app).get("/api/action")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(action._id.toString());
      expect(response.body[0].actionKind).toBe(action.actionKind);
      expect(response.body[0].smellKind).toBe(action.smellKind);
      expect(response.body[0].timestamp).toBe(action.timestamp);
      expect(response.body[0].className).toBe(action.className);
      expect(response.body[0].methodName).toBe(action.methodName);
      expect(response.body[0].packageName).toBe(action.packageName);
      expect(response.body[0].actionCanceled).toBe(action.actionCanceled);
      expect(response.body[0].actionDone).toBe(action.actionDone);
    });
});

test("GET /api/action/:id", async () => {
  const action = await Action.create({
    actionKind: "String",
    smellKind: "String",
    timestamp: 1,
    className: "String",
    methodName: "String",
    packageName: "String",
    actionCanceled: true,
    actionDone: true
  });

  await supertest(app).get("/api/action/" + action._id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(action._id.toString());
      expect(response.body.actionKind).toBe(action.actionKind);
      expect(response.body.smellKind).toBe(action.smellKind);
      expect(response.body.timestamp).toBe(action.timestamp);
      expect(response.body.className).toBe(action.className);
      expect(response.body.methodName).toBe(action.methodName);
      expect(response.body.packageName).toBe(action.packageName);
      expect(response.body.actionCanceled).toBe(action.actionCanceled);
      expect(response.body.actionDone).toBe(action.actionDone);
    });
});