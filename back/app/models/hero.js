import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize-client.js";

export class Hero extends Model {}

Hero.init(
	{
		hero_name: {
			type: DataTypes.TEXT,
			allowNull: false,
            unique: true,
		},
		firstname: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		profile_img: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		png_img: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        bg_gradient: {
            type: DataTypes.TEXT
        },
        name_color: {
            type: DataTypes.TEXT
        }
	},
	{
		sequelize,
		tableName: "hero",
	},
);