'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    EventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    validate: {
      cannotLikeTwice(done){
        Like.count({
          where: {
            EventId: this.EventId,
            userId: this.userId
          }
        }).then((count) => {
          if (count > 0) {
            done(new Error('Cannot Like Twice!'))
          } else {
            done();
          }
        }).catch((err) => {
            done(err)
        });
      }
    }
  });
  Like.associate = function(models) {
    Like.belongsTo(models.Event)
  };
  return Like;
};
