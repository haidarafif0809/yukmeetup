'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attendee = sequelize.define('Attendee', {
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Attendee.associate = function(models) {
    Attendee.belongsTo(models.Event)
    Attendee.belongsTo(models.User)
  };
  return Attendee;
};
