const getData = async (req, res) => {
  res.status(201).json({ message: "Data fetched successfully" });
};

module.exports = getData;
