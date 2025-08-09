import { AppUser } from "../models/associations.js";
import { appUserSchema, idSchema, updateAppUserSchema  } from "../schemas/index.js";
// import bcrypt from "bcrypt";

// Get all appusers
export const getAll = async (req, res) => {
  try {
    const users = await AppUser.findAll({
      include: [ { association: "heroes" } ],
      order: [['id', 'ASC']]
    });

    const usersWithoutPasswords = users.map(user => {
      const userData = user.toJSON();
      delete userData.password;
      return userData;
    });
    
    res.json(usersWithoutPasswords)
  } catch (error) {
    console.log("Error fetching users data:", error);
    res.status(500).json({error: "Failed to fetch users data"});
  }
}

// Get one appuser by id
export const getOne = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);

    const user = await AppUser.findByPk(id, {
      include: [ { association: "heroes" } ],
      order: [['id', 'ASC']]
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    res.json(user)
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
    }
    res.status(500).json({error: "Failed to fetch user data"});
  }
}