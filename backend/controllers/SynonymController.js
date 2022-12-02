let allSynonymGroups = [];
let map = new Map();

// @desc Get synonyms for a specified key
// @route GET /api/synonyms/:key
// @access public

const getSpecificSynonyms = async (req, res) => {
  if (map.has(req.params.key)) {
    return res.status(200).json(allSynonymGroups[map.get(req.params.key)]);
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

  //error handling in case req.body is empty
  if (!req.body.word || !req.body.synonym) {
    return res.status(400).json({ message: "Please add synonym and word" });
  }
  //first element
  if (allSynonymGroups.length === 0) {
    map.set(req.body.word, 0); // replace temp with index
    map.set(req.body.synonym, 0);
    allSynonymGroups.push([req.body.word, req.body.synonym]);
    return res.status(201).json({ message: "Addded synonym" });
  }

  //now for all other inserts we need to do checks
  //--------------------------------------------------------
  //check if we have one of these or both
  if (map.has(req.body.word)) {
    if (map.has(req.body.synonym)) {
      res.status(400).json({ message: "Synonym already exist" });
      return;
    }
    allSynonymGroups[map.get(req.body.word)].push(req.body.synonym);
    map.set(req.body.synonym, map.get(req.body.word));
    res.status(201).json({ message: "Addded synonym" });
    return;
  }
  //secod case
  if (map.has(req.body.synonym)) {
    if (map.has(req.body.word)) {
      res.status(400).json({ message: "Synonym already exist" });
      return;
    }
    allSynonymGroups[map.get(req.body.synonym)].push(req.body.word);
    map.set(req.body.word, map.get(req.body.synonym));
    res.status(201).json({ message: "Addded synonym" });
    return;
  }
  //--------------------------------------------------------
  //Now we can insert a new set of synonyms
  allSynonymGroups.push([req.body.word, req.body.synonym]);
  map.set(req.body.word, allSynonymGroups.length - 1);
  map.set(req.body.synonym, allSynonymGroups.length - 1);

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
