"use strict";

const slugify = require("../helpers/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=54fd6cddc50f4c43b438685330834800");
        let { articles } = await response.json();
        const authorIds = ["65533cbfce27b04a80fb8eae", "65533ce5ce27b04a80fb8eaf", "65533d05ce27b04a80fb8eb0"];
        const posts = articles
            .filter((article) => article.source.id != null)
            .map((article) => {
                let post = {};
                post.title = article.title;
                post.slug = slugify(article.title);
                post.content = article.content;
                post.imgUrl = article.urlToImage;
                post.categoryId = Math.ceil(Math.random() * 9);
                post.authorId = authorIds[Math.floor(Math.random() * 3)];
                post.createdAt = post.updatedAt = new Date();
                return post;
            });
        await queryInterface.bulkInsert("Posts", posts);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Posts", null);
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
