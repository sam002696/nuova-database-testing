const router = require("express").Router();
const Property = require("../models/Property");
const Tenant = require("../models/uploadTenant");
const User = require("../models/User");



//create a property

router.post("/", async (req, res) => {
    const newProperty = new Property(req.body)
    try {
        const savedProperty = await newProperty.save()
        res.status(200).json(savedProperty);
    } catch (err) {
        res.status(500).json(err)
    }
})

//get a single property

router.get("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json(err)
    }

})

//get a single property with tenant details 

router.get("/tenantdetail/:id", async (req, res) => {
    try {
        // const user = await User.findById(req.params.userid)
        const property = await Property.findById(req.params.id).populate("tenantDetails");

        // const list = await Promise.all(
        //     property.tenantDetails.map((tenant) => {
        //         return tenant
        //     })
        // );

        res.status(200).json(property);
    } catch (err) {
        res.status(500).json(err)
    }

})

//find a single property based on user's name/email

router.get("/", async (req, res) => {
    try {
        const name = req.query.name;
        const property = await Property.findOne({ tenantName: name }).populate("tenantDetails")
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json(err)
    }

})

//update a single property
router.put("/:id", async (req, res) => {
    try {
        try {
            const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json(updatedProperty)
        } catch (err) {
            res.status(404).json(err)
        }

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;