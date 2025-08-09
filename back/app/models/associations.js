import { AppUser } from "./app-user.js";
import { Hero } from "./hero.js";
import { sequelize } from "../../config/sequelize-client.js";

AppUser.hasMany(Hero, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "heroes"
});
Hero.belongsTo(AppUser, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "appUser",
});

export { AppUser, Hero, sequelize }