const router = require("express").Router();
const Category = require("../models/Category");


//create Category

router.post("/", async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const saveCategory = await newCategory.save();
        res.status(200).json(saveCategory);
    } catch (err) {
        res.status(500).json(err)
    }
})


//get Categories
router.get("/", async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err)
    }

})



module.exports = router;