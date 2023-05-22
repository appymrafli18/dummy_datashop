import { Sequelize } from 'sequelize';
import dbms from '../config/Database.js';

const { DataTypes } = Sequelize;

const Product = dbms.define(
  'product',
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    images: DataTypes.STRING,
    url_images: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Product;
