const { Category } = require("../models");

class CategoryController {
    static async create(req, res, next) {
        const { name } = req.body;
        try {
            const category = await Category.create({ name });
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }
    static async findAll(req, res, next) {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async edit(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            await Category.update({ name }, { where: { id } });
            res.json({ message: `Category with id ${id} updated` });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            await Category.destroy({ where: { id } });
            res.json({ message: `Category with id ${id} deleted` });
        } catch (error) {
            next(error);
        }
    }

    static async findCategory(req, res, next) {
        const { id } = req.params;
        try {
            const category = await Category.findOne({ where: { id } });
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoryController;
