const express = require("express");
const router = express.Router();
const {
  getSpecificSynonyms,
  setSynonyms,
  deleteSynonyms,
} = require("../controllers/SynonymController");

//All routes on /api/synonyms
router.route("/").post(setSynonyms).delete(deleteSynonyms);
//All routes on /api/synonyms/:key
router.route("/:key").get(getSpecificSynonyms);

module.exports = router;
