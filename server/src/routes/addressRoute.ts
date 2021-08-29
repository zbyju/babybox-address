import {Router} from 'express';
import {find, count, findByBabybox, findById, findDuplicatesCompany, findDuplicatesEmail, removeById, save, updateById} from '../dto/addressDto'
import mongoose from "mongoose";
import {validateAddress} from '../validation/address'
import { findOne } from '../dto/babyboxDto';

export const router: Router = Router();

// Routes
router.get("/", async (req, res) => {
    try {
        const addresses = await find({})
        return res.json({ success: true, addresses })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/count/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const cnt = await count({ babyboxId })
        return res.json({ success: true, count: cnt, babyboxId })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
})

router.get("/:addressId", async (req, res) => {
    const addressId = mongoose.Types.ObjectId(req.params.addressId)
    try {
        const address = await findById(addressId)
        return res.json({ success: true, address })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/babybox/handle/:handle", async (req, res) => {
    try {
        const babybox = await findOne({ handle: req.params.handle })
        const addresses = await findByBabybox(babybox._id)
        return res.json({ success: true, addresses })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/Babybox/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const addresses = await findByBabybox(babyboxId)
        return res.json({ success: true, addresses })
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
        return res.status(201).json({ success: true, address })
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

router.get("/duplicate/email/:email", async(req, res) => {
    try {
        const result = await findDuplicatesEmail(req.params.email)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json(err)
    }
})

router.get("/duplicate/company/:company", async(req, res) => {
    try {
        const result = await findDuplicatesCompany(req.params.company)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json(err)
    }
})
