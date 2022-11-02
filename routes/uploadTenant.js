const router = require("express").Router();
const uploadTenant = require("../models/uploadTenant");
const property = require("../models/Property");

//CREATE 
router.post("/upload/:propertyid", async (req, res) => {
    const propertyId = req.params.propertyid;
    const uploadTenants = new uploadTenant(req.body);

    try {
        const saveduploadTenants = await uploadTenants.save();
        try {
            await property.findByIdAndUpdate(propertyId, {
                $push: { tenantDetails: saveduploadTenants._id },
            });
            await property.findByIdAndUpdate(propertyId, {
                $push: { tenantName: saveduploadTenants.username },
            });
        } catch (err) {
            res.status(403).json(err)
        }
        res.status(200).json(saveduploadTenants);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete
router.delete("/:id/:propertyid", async (req, res) => {
    const propertyId = req.params.propertyid;
    try {
        await uploadTenant.findByIdAndDelete(req.params.id);
        try {
            await property.findByIdAndUpdate(propertyId, {
                $pull: { tenantDetails: req.params.id },
            });
        } catch (err) {
            res.status(403).json(err)
        }
        res.status(200).json("tenant details has been deleted.");
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;