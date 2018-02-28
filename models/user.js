'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    emai: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email Sudah Terdaftar'
      }
      validate: {
        isEmail: {
          msg: 'Email Harus Di Masukkan Dalam Format foo@bar.com'
        }
      }
    }
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
