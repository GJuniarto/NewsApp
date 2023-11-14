"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Email is required!"
                    },
                    notNull: {
                        msg: "Email is required!"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password is required!"
                    },
                    notNull: {
                        msg: "Password is required!"
                    },
                    len: {
                        args: 5,
                        msg: "Password min length is 5!"
                    }
                }
            },
            role: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING
        },
        {
            hooks: {
                beforeCreate(user, option) {
                    const hashPassword = require("bcryptjs").hashSync(user.password, 8);
                    user.password = hashPassword;
                }
            },
            sequelize,
            modelName: "User"
        }
    );
    return User;
};
