import { Hero } from "../models/associations.js";

// Get 6 first heroes for homepage
export const getFirstHeroes = async (req, res) => {
  try {
    const heroes = await Hero.findAll({
      order: [['id', 'ASC']],
      limit: 6,
      attributes: ['id', 'hero_name', 'profile_img', 'created_at']
    });
    
    res.json(heroes)
  } catch (error) {
    console.log("Error fetching heroes data:", error);
    res.status(500).json({error: "Failed to fetch heroes data"});
  }
}

// Get 6 last heroes DESC
export const getLastHeroes = async (req, res) => {
  try {
    const heroes = await Hero.findAll({
        order: [['created_at', 'DESC']],
        limit: 6,
        attributes: ['id', 'hero_name', 'profile_img', 'id_app_user', 'created_at'],
        include: { 
            association: "appUser", 
            attributes: [ 'username' ] 
        },
    });
    
    res.json(heroes)
  } catch (error) {
    console.log("Error fetching heroes data:", error);
    res.status(500).json({error: "Failed to fetch heroes data"});
  }
}