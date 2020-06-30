module.exports = (sequelize, DataTypes)=> {
    const Plant = sequelize.define("Plant", {
    name: DataTypes.STRING,
    dayPlanted: DataTypes.BIGINT,
    maturity: DataTypes.INTEGER,
    img: DataTypes.STRING,
    positionTop: {
      type: DataTypes.INTEGER,
      defaultValue: 200
    },
    positionLeft: {
      type: DataTypes.INTEGER,
      defaultValue: 150
    }
});


Plant.associate = function(models) {

    Plant.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
    }
    })
  }
return Plant
}