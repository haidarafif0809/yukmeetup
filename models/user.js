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
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Event,{through:models.Attendee})
    User.hasMany(models.Attendee)
  };
  User.afterDestroy((user) => {
    sequelize.models.Attendee.all({
      where: {
        UserId: user.id
      }
    }).then((attendees) => {
      attendees.forEach((attendee) => {
        attendee.destroy();
      });
    });

    sequelize.models.Event.all({
      where: {
        UserId: user.id
      }
    }).then((events) => {
      events.forEach((event) => {
        event.destroy();
      });
    })

  });
  return User;
};
