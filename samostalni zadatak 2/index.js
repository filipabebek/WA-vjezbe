const express = require('express');
const propertiesRouter = require('./routes/properties');
const offersRouter = require('./routes/offers');

const app = express();
app.use(express.json());

app.use('/properties', propertiesRouter);
app.use('/offers', offersRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});
