import { Category } from '../models/Category.js';

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

export { createCategory };
