const { Post, Category, Tag, sequelize } = require("../models");
const slugify = require("../helpers/slug");

class PostController {
    static async findAll(req, res, next) {
        try {
            const posts = await Post.findAll({ include: [Category, Tag] });
            res.json(posts);
        } catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        const { title, content, categoryId, tags, imgUrl, authorId } = req.body;
        const t = await sequelize.transaction();
        const slug = slugify(title);
        try {
            const post = await Post.create({ title, content, imgUrl, categoryId, slug, authorId }, { transaction: t });
            if (tags?.length) {
                const tagsData = tags.map((el) => {
                    el.postId = post.id;
                    return el;
                });
                const newTags = await Tag.bulkCreate(tagsData, { transaction: t });
            }
            await t.commit();
            res.status(201).json(post);
        } catch (error) {
            await t.rollback();
            next(error);
        }
    }
    static async findPost(req, res, next) {
        const { id } = req.params;
        try {
            const post = await Post.findOne({ where: { id }, include: [Category, Tag] });
            res.json(post);
        } catch (error) {
            next(error);
        }
    }
    static async editPost(req, res, next) {
        const { id } = req.params;
        const { title, content, categoryId, imgUrl } = req.body;
        const slug = slugify(title);
        const t = await sequelize.transaction();
        try {
            await Post.update({ title, slug, content, categoryId, imgUrl }, { where: { id }, transaction: t });
            await t.commit();
            res.json({ message: `Post with id ${id} updated!` });
        } catch (error) {
            await t.rollback();
            next(error);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;
        try {
            await Post.destroy({ where: { id } });
            res.json({ message: `Post with id ${id} deleted! ` });
        } catch (error) {
            next(error);
        }
    }

    static async findPostBySlug(req, res, next) {
        const { slug } = req.params;
        try {
            const post = await Post.findOne({ where: { slug }, include: [Tag, Category] });
            console.log(post);
            res.json(post);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PostController;
