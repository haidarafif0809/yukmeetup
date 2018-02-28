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
    // associations can be defined here
  };
  return Event;
};
