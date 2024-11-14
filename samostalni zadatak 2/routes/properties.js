const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', (req, res) => {
    res.status(200).json(db.properties);
});

router.get('/:id', (req, res) => {
    const property = db.properties.find(p => p.id === parseInt(req.params.id));
    if (!property) {
        return res.status(404).send("Nekretnina nije pronađena");
    }
    res.status(200).json(property);
});

router.post('/', (req, res) => {
    const { id, name, description, price, location, rooms, area } = req.body;

    if (!id || !name || !description || price === undefined || !location || rooms === undefined || area === undefined) {
        return res.status(400).send("Nedostaju podaci o nekretnini. Sva polja moraju biti popunjena");
    }
    if (price < 0 || rooms < 0 || area < 0) return res.status(400).send("Neispravni podaci.");

    db.properties.push({ id, name, description, price, location, rooms, area });
    res.status(201).send("Nekretnina dodana.");
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.properties.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send("Nekretnina nije pronađena.");

    const { name, description, price, location, rooms, area } = req.body;
    if (!name || !description || price === undefined || !location || rooms === undefined || area === undefined) {
        return res.status(400).send("Nedostaju podaci o nekretnini.");
    }

    db.properties[index] = { id, name, description, price, location, rooms, area };
    res.send("Nekretnina ažurirana.");
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const property = db.properties.find(p => p.id === id);

    if (!property) return res.status(404).send("Nekretnina nije pronađena.");

    const { name, description, price, location, rooms, area } = req.body;
    if (price < 0 || rooms < 0 || area < 0) return res.status(400).send("Neispravni podaci.");

    if (name) property.name = name;
    if (description) property.description = description;
    if (price !== undefined) property.price = price;
    if (location) property.location = location;
    if (rooms !== undefined) property.rooms = rooms;
    if (area !== undefined) property.area = area;

    res.send("Nekretnina djelomično ažurirana.");
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = db.properties.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).send("Nekretnina nije pronađena.");

    db.properties.splice(index, 1);
    res.send("Nekretnina obrisana.");
});

module.exports = router;
