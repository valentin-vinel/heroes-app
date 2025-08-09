import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize-client.js";

export class AppUser extends Model {}

AppUser.init(
	{
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		role: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: "user",
		}
	},
	{
		sequelize,
		tableName: "app_user",
	},
);