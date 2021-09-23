import {Router} from 'express';
import {find, count, findByBabybox, findById, findDuplicatesCompany, findDuplicatesEmail, removeById, save, updateById} from '../dto/addressDto'
import mongoose from "mongoose";
import {validateAddress} from '../validation/address'
import { findOne } from '../dto/babyboxDto';
import { duplicatesUnique } from '../utils/address';

export const router: Router = Router();

// Routes
router.get("/", async (req, res) => {
    try {
        const addresses = await find({})
        return res.json(addresses)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/count/handle/:handle", async (req, res) => {
    try {
        const babybox = await findOne({handle: req.params.handle})
        const cnt = await count({ babyboxId: babybox._id})
        return res.json({count: cnt})
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
})

router.get("/count/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const cnt = await count({ babyboxId })
        return res.json({ count: cnt })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
})

router.get(["/duplicate/:handle/:company/:email",
            "/duplicate/:handle//:email",
            "/duplicate/:handle/:company/",
            "/duplicate/:handle//"], async(req, res) => {
    try {
        const babybox = await findOne({handle: req.params.handle})
        const dupCompany = req.params.company ? await findDuplicatesCompany(babybox._id, req.params.company) : []
        const dupEmail = req.params.email ? await findDuplicatesEmail(babybox._id, req.params.email) : []
        const duplicates = duplicatesUnique(dupCompany, dupEmail)
        return res.status(200).json(duplicates)
    } catch(err) {
        return res.status(500).json(err)
    }
})

router.get("/:addressId", async (req, res) => {
    const addressId = mongoose.Types.ObjectId(req.params.addressId)
    try {
        const address = await findById(addressId)
        return res.json(address)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/babybox/handle/:handle", async (req, res) => {
    try {
        const babybox = await findOne({ handle: req.params.handle })
        const addresses = await findByBabybox(babybox._id)
        return res.json(addresses)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/Babybox/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const addresses = await findByBabybox(babyboxId)
        return res.json(addresses)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.post("/:babyboxId", async (req, res) => {
    req.body.babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    const valid = validateAddress(req.body)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    try {
        const address = await save(req.body)
        return res.status(201).json(address)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.post("/handle/:handle", async (req, res) => {
    try {
        const babybox = await findOne({handle: req.params.handle})
        req.body.babyboxId = babybox._id
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
    const valid = validateAddress(req.body)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    try {
        const address = await save(req.body)
        return res.status(201).json(address)
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.put("/:addressId", async (req, res) => {
    const addressId = mongoose.Types.ObjectId(req.params.addressId)
    try {
        const address = await updateById(addressId, req.body)
        return res.status(200).json(address)
    } catch(err) {
        return res.status(500).json(err)
    }
});

router.delete("/:addressId", async (req, res) => {
    const addressId = mongoose.Types.ObjectId(req.params.addressId)
    try {
        const result = await removeById(addressId)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json(err)
    }
});
