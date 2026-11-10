import { isValidObjectId } from 'mongoose';
import { Category } from '../models/Category.js';

// Create a new category
const createCategory = async (req, res, next) => {
  const { name, type } = req.body ?? {};

  if (typeof name !== 'string' || !['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Name and a valid type are required.' });
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2 || trimmedName.length > 40) {
    return res.status(400).json({ message: 'Name must be between 2 and 40 characters.' });
  }

  try {
    const category = await Category.create({
      userId: req.userId,
      name: trimmedName,
      type
    });

    return res.status(201).json({
      id: category.id,
      name: category.name,
      type: category.type
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You already have this category.' });
    }

    return next(error);
  }
};

// Get all categories for the authenticated user
const getCategories = async (req, res, next) => {
  const { type } = req.query;

  if (type !== undefined && !['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'Type must be income or expense.' });
  }

  try {
    const filter = { userId: req.userId, ...(type && { type }) };
    const categories = await Category.find(filter).sort({ name: 1 }).collation({ locale: 'en', strength: 2 });

    return res.json(
      categories.map((category) => ({
        id: category.id,
        name: category.name,
        type: category.type
      }))
    );
  } catch (error) {
    return next(error);
  }
};

// Update an existing category by ID
const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body ?? {};

  if (!isValidObjectId(id)) {
    return res.status(404).json({ message: 'Category not found.' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ message: 'Name is required.' });
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2 || trimmedName.length > 40) {
    return res.status(400).json({ message: 'Name must be between 2 and 40 characters.' });
  }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name: trimmedName },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.json({
      id: category.id,
      name: category.name,
      type: category.type
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'You already have this category.' });
    }

    return next(error);
  }
};

export { createCategory, getCategories, updateCategory };
