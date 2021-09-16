let development = process.env.NODE_ENV !== 'production';

module.exports = {
  url: development ? "mongodb://127.0.0.1:27017/iges" : "mongodb://127.0.0.1:27017/iges",
  testUrl: development ? "mongodb://127.0.0.1:27017/JestDB" : "mongodb://127.0.0.1:27017/JestDB"
};