const express = require("express");
const {
  getAllPets,
  getSinglePet,
  addPet,
  updatePet,
  deletePet,
} = require("../controller/pets.controller");

const router = express.Router();

router.get("/pet", getAllPets);
router.get("/pet/:id", getSinglePet);
router.post("/pet", addPet);
router.put("/pet/:id", updatePet);
router.delete("/pet/:id", deletePet);

module.exports = router;
