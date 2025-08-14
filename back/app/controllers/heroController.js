import { Hero } from "../models/associations.js";
import { idSchema, heroSchema, updateHeroSchema } from "../schemas/index.js";

// Get all heroes
export const getAll = async (req, res) => {
  try {
    const heroes = await Hero.findAll({
      order: [['created_at', 'ASC']]
    });
    
    res.json(heroes)
  } catch (error) {
    console.log("Error fetching heroes data:", error);
    res.status(500).json({error: "Failed to fetch heroes data"});
  }
}

// Get one hero by id
export const getOne = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);

    const hero = await Hero.findByPk(id);
    
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    };
    
    res.json(hero)
  } catch (error) {
    console.error("Error fetching hero data:", error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "ID de requête invalide", details: error.errors });
    }
    res.status(500).json({error: "Failed to fetch hero data"});
  }
}

// Create one hero
export const createOne = async (req, res) => {
  try {
    const dataHero = heroSchema.parse(req.body);
    const newHero = await Hero.create( dataHero );

    res.status(201).json(newHero);
  } catch (error) {
    console.error("Error:",error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "Data invalid", details: error.errors });
    }
    res.status(500).json({ message: "Internal server error while creating hero" });
  }
}

// Update one hero by id
export async function updateOneById(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const data = updateHeroSchema.parse(req.body);
    const hero = await Hero.findByPk(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    };

    await hero.update(data);

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "Data invalid", details: error.errors });
    }
      res.status(500).json({ message: "Internal server error while updating hero" });
  }
}

// Delete one hero by id
export async function deleteOneById(req, res) {
  try {
    const { id } = idSchema.parse(req.params);
    const hero = await Hero.findByPk(id);

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    await hero.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    if (error.name === 'ZodError' || error.name === 'ValidationError') {
      return res.status(400).json({ error: "Data invalid", details: error.errors });
    }
      res.status(500).json({ message: "Internal server error while deleting hero" });
  }
}