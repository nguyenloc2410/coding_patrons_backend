"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ability.belongsToMany(models.position, { through: "role" });
    }
  }
  ability.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ability",
    }
  );
  return ability;
};
