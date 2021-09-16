const db = require("../../models");
const Stat = db.Stat;

const supertest = require("supertest");

test("Stat virtual fields", () => {
  const stat = new Stat();
  stat.nOfExecutionTextual = 2;
  stat.nOfExecutionStructural = 2;
  
  expect(stat.nOfTotalExecution).toBe(4);
})