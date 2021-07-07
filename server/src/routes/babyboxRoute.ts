import { Router } from 'express';
export const router: Router = Router();

// Routes
router.get("/", (req, res) => {
    res.status(200).send({
        message: "GET request from sample router"
    });
});

router.post("/", (req, res) => {
    res.status(200).send({
        message: "POST request from sample router"
    });
});

router.put("/", (req, res) => {
    res.status(200).send({
        message: "PUT request from sample router"
    });
});

router.delete("/", (req, res) => {
    res.status(200).send({
        message: "DELETE request from sample router"
    });
});