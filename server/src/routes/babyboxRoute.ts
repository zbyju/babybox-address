import { Router } from 'express';
export const router: Router = Router();

import { find, findById, updateById, save, removeById } from '../dto/babyboxDto'
import mongoose from "mongoose";
import {validateBabybox, validateFavorite, validateNote } from "../validation/babybox";

// Routes
router.get("/", async (req, res) => {
    try {
        const babyboxes = await find({})
        return res.json({ success: true, babyboxes })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.get("/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const babybox = await findById(babyboxId)
        return res.json({ success: true, babybox })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.post("/", async (req, res) => {
    const valid = validateBabybox(req.body)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    try {
        const babybox = await save(req.body)
        return res.status(201).json({ success: true, babybox })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.put("/:babyboxId/favorite", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    const valid = validateFavorite(req.body.favorite)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    const bb: any = { favorite: req.body.favorite}
    try {
        const babybox = await updateById(babyboxId, bb)
        return res.json({ success: true, babybox })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.put("/:babyboxId/note", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    const valid = validateNote(req.body.note)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    const bb: any = { note: req.body.note }
    try {
        const babybox = await updateById(babyboxId, bb)
        return res.json({ success: true, babybox })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.delete("/:babyboxId", async (req, res) => {
    const babyboxId = mongoose.Types.ObjectId(req.params.babyboxId)
    try {
        const result = await removeById(babyboxId)
        return res.status(200).json(result)
    } catch(err) {
        return res.status(500).json(err)
    }
});
