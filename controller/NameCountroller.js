const getMsg = (req, res) => {
    const name = req.body.name;

    const text = "hello "+name 

    res.status(200).json({ message: text });
};

module.exports = { getMsg };
