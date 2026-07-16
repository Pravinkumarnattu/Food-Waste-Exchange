
const getData = async (req, res) => {
    res.status(200).json({ message: 'Data fetched successfully' });
}

module.exports = getData;