'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    UserId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    EventId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User);
  };
  return Comment;
};
