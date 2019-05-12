const Sequelize = require('sequelize');
const sequelize = new Sequelize('poki', 'root', 'PASSWORD', {
    host: 'localhost',
    dialect: 'mysql'
});
const Op = Sequelize.Op;


const Chat = sequelize.define('chat', {
    fromUid: Sequelize.STRING,
    toUid: Sequelize.STRING,
    name: Sequelize.STRING,
    msg: Sequelize.STRING
  });

  module.exports = {
    sequelize: sequelize,
    Chat: Chat,
    Op: Op
  }