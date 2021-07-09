import {Router} from 'express';
import {findByName, save} from '../dto/names/firstnameDto'
import {validateNameString, validateName} from "../validation/name";

export const router: Router = Router();

// Routes

router.get("/:name", async (req, res) => {
    const valid = validateNameString(req.params.name)
    if(!valid.success) {
        return res.status(400).json(valid)
    }
    try {
        const name = await findByName(req.params.name)
        return res.json({ success: true, name })
    } catch(err) {
        return res.status(500).json({ success: false, error: err})
    }
});

router.post("/", async (req, res) => {
    const valid = validateName(req.body)
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