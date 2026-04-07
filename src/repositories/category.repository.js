const { Category } = require('../models');

class CategoryRepository {
  async findAll() {
    return await Category.findAll({
      where: { active: true },
      order: [['name', 'ASC']],
    });
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async create(data) {
    return await Category.create(data);
  }

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update({ active: false }); // Soft delete
  }
}

module.exports = new CategoryRepository();
