import express from "express"
import cors from 'cors';
import proizvodiRouter from './routes/proizvodi.js'
import narudzbeRouter from './routes/narudzbe.js'

const app = express()

app.use(express.json());
app.use(cors());

app.use("/proizvodi", proizvodiRouter);
app.use("/narudzbe", narudzbeRouter);

let PORT = 3000;

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server dela na http://localhost:${PORT}`);
    }
})