'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attendee = sequelize.define('Attendee', {
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    validate: {
      cannotJoinOwnEvent(done){
        // sequelize.Event.count({
        //   where: {
        //     UserId: this.UserId,
        //     id: this.EventId
        //   }
        // }).then((count) => {
        //   if (count > 0) {
        //     done(new Error('Cannot Join Own Event!'))
        //   } else {
        //     done();
        //   }
        // }).catch((err) => {
        //     done(err)
        // });
        done();
      },
      cannotJoinTwice(done){
        Attendee.count({
          where: {
            UserId: this.UserId,
            EventId: this.EventId
          }
        }).then((count) => {
          if (count > 0) {
            done(new Error('Cannot Join Twice!'))
          } else {
            done();
          }
        }).catch((err) => {
            done(err)
        });
      }
    }
  });
  Attendee.associate = function(models) {
    Attendee.belongsTo(models.Event)
    Attendee.belongsTo(models.User)
  };
  return Attendee;
};
