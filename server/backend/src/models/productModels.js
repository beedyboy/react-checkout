module.exports = (sequelize, DataTypes) => {
  return Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.NUMBER,
    },
    quantity: {
      type: DataTypes.NUMBER
    }
  })
}