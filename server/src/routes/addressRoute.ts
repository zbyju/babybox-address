import {Router} from 'express';
import {find, findByBabybox, findById, removeById, save, updateById} from '../dto/addressDto'
import mongoose from "mongoose";
import {validateAddress} from '../validation/address'

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

router.get("/:addressId", async (req, res) => {
    const addressId = mongoose.Types.ObjectId(req.params.addressId)
    try {
        const address = await findById(addressId)
        return res.json({ success: true, address })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/babybox/:babyboxId", async (req, res) => {
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
        return res.status(201).json(valid)
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