"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = require("../data/users.json").map((el) => {
            const hashPassword = require("bcryptjs").hashSync(el.password, 8);
            el.password = hashPassword;
            el.createdAt = el.updatedAt = new Date();
            return el;
        });
        await queryInterface.bulkInsert("Users", users);
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
        await queryInterface.bulkDelete("Users", null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
