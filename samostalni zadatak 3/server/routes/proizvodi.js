import express from "express"
import { Proizvod, proizvodi } from '../data.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(proizvodi);
})

router.get("/:id", (req, res) => {
    let id_proizvod = req.params.id;
    if (isNaN(id_proizvod)) {
        res.status(400).json("Id mora biti broj");
    }

    let proizvod = proizvodi.find(p => p.id == id_proizvod);

    return res.status(200).json(proizvod);
})


export default router;