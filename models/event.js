'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    eventTitle: DataTypes.STRING,
    eventOrganizer: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isValid(value, callback){
          if(value<=Date.now()){
            callback('Tanggal event tidak boleh sebelum hari ini!')
          }
          callback('')
        }
      }
    }
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.User)
    Event.belongsToMany(models.User,{through:models.Attendee})
    Event.hasMany(models.Attendee)
  };
  Event.afterDestroy((event) => {
    sequelize.Attendee.all({
      where: {
        EventId: event.id
      }
    }).then((attendees) => {
      attendees.forEach((attendee) => {
        attendee.destroy();
      });
    });
  });
  return Event;
};
