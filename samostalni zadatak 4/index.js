import express from 'express';
import fs from 'fs/promises';

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Vrijeme je za čitanje datoteka!');
});

app.get('/zaposlenici/:id', async (req, res) => {
    let dohvaceni_id = req.params.id;
    try {
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        const zaposlenici = JSON.parse(data);
        const filtered_zaposlenik = zaposlenici.find(zaposlenik => zaposlenik.id == dohvaceni_id);
        if (!filtered_zaposlenik) {
            return res.status(404).json({ message: 'Zaposlenik nije pronađen.' });
        }
        if (isNaN(dohvaceni_id)) {
            return res.status(404).json({ message: 'Id nije broj' })
        }
        return res.status(200).json(filtered_zaposlenik);
    } catch (error) {
        console.error('Greška prilikom čitanja datoteke:', error);
        res.status(500).send('Greška prilikom čitanja datoteke.');
    }
});

app.get('/zaposlenici', async (req, res) => {
    let { ime, pozicija, godine_staza, godine_min, godine_max, godine_sort } = req.query;

    try {
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        let zaposlenici = JSON.parse(data);


        if (ime) {
            zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.ime === ime);
        }
        if (pozicija) {
            zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.pozicija === pozicija);
        }
        if (godine_staza) {
            zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.godine_staza === godine_staza);
        }
        if (godine_staza && isNaN(godine_staza)) {
            return res.status(404).json({ message: 'Godine moraju biti broj' })
        }
        if (godine_min) {
            zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.godine_staza >= godine_min);
        }
        if (godine_min && isNaN(godine_min)) {
            return res.status(404).json({ message: 'Godine moraju biti broj' })
        }
        if (godine_max) {
            zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.godine_staza <= godine_max);
        }
        if (godine_max && isNaN(godine_max)) {
            return res.status(404).json({ message: 'Godine moraju biti broj' })
        }
        if (godine_sort === 'uzlazno') {
            zaposlenici.sort((a, b) => a.godine_staza - b.godine_staza);
        } else if (godine_sort === 'silazno') {
            zaposlenici.sort((a, b) => b.godine_staza - a.godine_staza);
        }

        res.status(200).json(zaposlenici);
    } catch (error) {
        console.error('Greška prilikom čitanja datoteke:', error);
        res.status(500).send('Greška prilikom čitanja datoteke.');
    }
});

app.post('/zaposlenik', async (req, res) => {
    const { ime, prezime, godine_staza, pozicija } = req.body;
    if (!ime || !prezime || !godine_staza || !pozicija) {
        return res.status(400).send('Nedostaje neki podatak.');
    }
    if (isNaN(godine_staza)) {
        return res.status(404).json({ message: 'Godine moraju biti broj' })
    }
    if (typeof (ime) !== 'string') {
        return res.status(404).json({ message: 'Ime mora biti string' })
    }
    if (typeof (prezime) !== 'string') {
        return res.status(404).json({ message: 'Prezime mora biti string' })
    }
    if (typeof (pozicija) !== 'string') {
        return res.status(404).json({ message: 'Pozicija mora biti string' })
    }

    try {
        const data = await fs.readFile('zaposlenici.json', 'utf8');
        const zaposlenici = JSON.parse(data);

        const noviZaposlenik = {
            id: zaposlenici.length ? zaposlenici[zaposlenici.length - 1].id + 1 : 1,
            ime,
            prezime,
            godine_staza,
            pozicija,
        };

        zaposlenici.push(noviZaposlenik);
        await fs.writeFile('zaposlenici.json', JSON.stringify(zaposlenici, null, 2));

        console.log('Podaci uspješno zapisani u datoteku.');
        res.status(200).json(noviZaposlenik);
    } catch (error) {
        console.error('Greška prilikom pohrane u datoteku:', error);
        res.status(500).send('Greška prilikom pohrane u datoteku.');
    }
});

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});