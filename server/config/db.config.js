let development = process.env.NODE_ENV !== 'production';

module.exports = {
  url: development ? "mongodb://127.0.0.1:27017/iges" : "mongodb+srv://unisamensa:fallitidev@cluster0.obllp.mongodb.net/iges?retryWrites=true&w=majority",
  testUrl: development ? "mongodb://127.0.0.1:27017/testdb" : "mongodb+srv://unisamensa:fallitidev@cluster0.obllp.mongodb.net/testdb?retryWrites=true&w=majority"
};