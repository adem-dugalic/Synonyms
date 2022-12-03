let allSynonymGroups = [];
let map = new Map();

// @desc Get synonyms for a specified key
// @route GET /api/synonyms/:key
// @access public

const getSpecificSynonyms = async (req, res) => {
  if (map.has(req.params.key.toUpperCase())) {
    return res
      .status(200)
      .json(allSynonymGroups[map.get(req.params.key.toUpperCase())]);
  } else {
    return res.status(404).json({ msg: "Not fund sry!" });
  }
};

// @desc Set synonyms
// @route POST /api/synonyms
// @access public

const setSynonyms = async (req, res) => {
  //Map has to contain index for specific word which
  //corresponds to the specific array in the list
  const word = req.body.word.toUpperCase();
  const synonym = req.body.synonym.toUpperCase();
  //error handling in case req.body is empty
  if (!word || !synonym) {
    return res.status(400).json({ message: "Please add synonym and word" });
  }
  //first element
  if (allSynonymGroups.length === 0) {
    map.set(word, 0); // replace temp with index
    map.set(synonym, 0);
    allSynonymGroups.push([word, synonym]);
    return res.status(201).json({ message: "Addded synonym" });
  }

  //now for all other inserts we need to do checks
  //--------------------------------------------------------
  //check if we have one of these or both
  if (map.has(word)) {
    if (map.has(synonym)) {
      res.status(400).json({ message: "Synonym already exist" });
      return;
    }
    allSynonymGroups[map.get(word)].push(synonym);
    map.set(synonym, map.get(word));
    res.status(201).json({ message: "Addded synonym" });
    return;
  }
  //secod case
  if (map.has(synonym)) {
    if (map.has(word)) {
      res.status(400).json({ message: "Synonym already exist" });
      return;
    }
    allSynonymGroups[map.get(synonym)].push(word);
    map.set(word, map.get(synonym));
    res.status(201).json({ message: "Addded synonym" });
    return;
  }
  //--------------------------------------------------------
  //Now we can insert a new set of synonyms
  allSynonymGroups.push([word, synonym]);
  map.set(word, allSynonymGroups.length - 1);
  map.set(synonym, allSynonymGroups.length - 1);

  res.status(201).json({ message: "Addded synonym" });
  return;
};

// @desc Delete all synonyms
// @route DELETE /api/synonyms
// @access public

const deleteSynonyms = async (req, res) => {
  allSynonymGroups = [];
  map.clear();
  res.status(200).json({ message: `Deleted all synonyms` });
};

module.exports = {
  getSpecificSynonyms,
  setSynonyms,
  deleteSynonyms,
};
