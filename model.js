const Sequelize = require('sequelize');
const sequelize = new Sequelize('poki', 'root', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql'
});

const Chat = sequelize.define('chat', {
    uid: Sequelize.STRING,
    name: Sequelize.STRING,
    msg: Sequelize.STRING
  });

  module.exports = {
    sequelize: sequelize,
    Chat: Chat
  }