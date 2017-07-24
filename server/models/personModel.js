'use strict';
module.exports = function(sequelize, DataTypes) {
  var person = sequelize.define('person', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  person.associate = models => {
    person.hasMany(models.post, {
      foreignKey: 'personId',
      as: 'posts'
    });
  };
  return person;
};