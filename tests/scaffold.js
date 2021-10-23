const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const create = require("../server/controllers/Stat.controller").create;

const reqBody = require('./body.stub');

let mongod;

module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 10
  };
  await mongoose.connect(uri, mongooseOpts);
}

const mockRequest = (body) => {
  return body || {}
};

module.exports.mockRequest = mockRequest;

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

module.exports.mockResponse = mockResponse;

module.exports.crateStat = async () => {
  const req = mockRequest(reqBody);
  const res = mockResponse();
  return await create(req, res);
}

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    if (Object.hasOwnProperty.call(collections, key)) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
}

