import Product from '../models/modelProduct.js';
import { Op } from 'sequelize';

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json({
      message: 'Get All Data',
      status: '200',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    await res.status(200).json({
      message: 'Get All Data By Id',
      status: '200',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProductByCategory = async (req, res) => {
  const search = req.query.search;
  try {
    const response = await Product.findAll({
      where: {
        category: {
          [Op.like]: '%' + search + '%',
        },
      },
    });

    res.status(200).json({
      message: 'Get All Data By Category',
      status: '200',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProductByName = async (req, res) => {
  const search = req.query.search;
  try {
    const response = await Product.findAll({
      where: {
        name: {
          [Op.like]: '%' + search + '%',
        },
      },
    });

    res.status(200).json({
      message: 'Get All Data By Name',
      status: '200',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const postProduct = async (req, res) => {
  if (!req.file) {
    res.status(422).json({ message: 'must upload an image' });
  }

  const { name, description, price, quantity, category } = req.body;
  const url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  const images = req.file.path.replace(/\\/g, '/');

  try {
    const response = await Product.create({
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
      images: images,
      url_images: url,
    });

    res.status(201).json({
      message: 'Product Successfully Added',
      data: response,
    });
  } catch (error) {
    res.status(422).json({
      message: error.message,
    });
  }
};

export const updatingProduct = async (req, res) => {
  const { quantity, description } = req.body;

  try {
    await Product.update(
      { quantity: quantity, description: description },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const response = await Product.findOne({
      where: {
        id: req.params.id
      }
    })

    res.status(201).json({
      message: 'Product Updated',
      data: response
    });
  } catch (error) {
    res.status(422).json({
      message: error.message,
    });
  }
};
