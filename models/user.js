'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email Sudah Terdaftar'
      },
      validate: {
        isEmail: {
          msg: "Email harus dalam format foo@bar.com"
        }
      }
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Event,{through:models.Attendee})
    User.hasMany(models.Attendee)
  };
  return User;
};
