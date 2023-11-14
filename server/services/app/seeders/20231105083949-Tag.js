"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const tags = require("../data/tags.json").map((el) => {
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Tags", tags);
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
        await queryInterface.bulkDelete("Tags", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
