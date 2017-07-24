'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  post.associate = models => {
      post.belongsTo(models.person, {
        foreignKey: 'personId',
        onDelete: 'CASCADE'
      });
  };
  return post;
};