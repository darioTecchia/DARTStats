let development = process.env.NODE_ENV !== 'production';

module.exports = {
  url: development ? "mongodb+srv://unisamensa:fallitidev@cluster0.obllp.mongodb.net/iges?retryWrites=true&w=majority" : "mongodb://127.0.0.1:27017/iges",
  testUrl: development ? "mongodb+srv://unisamensa:fallitidev@cluster0.obllp.mongodb.net/testdb?retryWrites=true&w=majority" : "mongodb://127.0.0.1:27017/JestDB"
};