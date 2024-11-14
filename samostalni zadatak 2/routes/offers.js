const express = require('express');
const db = require('../../samostalni zadatak 2/data/database');

const router = express.Router();

router.post('/', (req, res) => {
    const { id, propertyId, buyersName, buyersSurname, offeredPrice, buyersPhoneNumber } = req.body;

    if (!id || !propertyId || !buyersName || !buyersSurname || offeredPrice === undefined || !buyersPhoneNumber) {
        return res.status(400).send("Nedostaju podaci o ponudi.");
    }
    if (offeredPrice < 0) return res.status(400).send("Ponuđena cijena ne može biti negativna.");

    const property = db.properties.find(p => p.id === propertyId);
    if (!property) return res.status(404).send("Nekretnina nije pronađena.");

    db.offers.push({ id, propertyId, buyersName, buyersSurname, offeredPrice, buyersPhoneNumber });
    res.status(201).send("Ponuda dodana.");
});

router.get('/', (req, res) => {
    res.status(200).json(db.ponude);
});

module.exports = router;
