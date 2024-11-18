class Proizvod {
    constructor(id, naziv, cijena, velicine, opis, dostupne_boje, karakteristike, slike) {
        this.id = id;
        this.naziv = naziv;
        this.cijena = cijena;
        this.velicine = velicine;
        this.opis = opis;
        this.dostupne_boje = dostupne_boje;
        this.karakteristike = karakteristike;
        this.slike = slike;
    }
}


const proizvodi = [
    new Proizvod(1, 'Sportski ruksak', 150, ['onesize'], 'Idealan za planinarenje ili teretanu', ['crna', 'siva', 'crvena'], 'vodootporan', ['https://www.sportvision.hr/files/thumbs/files/images/slike_proizvoda/media/CHE/CHE233F106-01/images/thumbs_600/CHE233F106-01_600_600px.jpg.webp']),
    new Proizvod(2, 'Kožna jakna', 300, ['M', 'L', 'XL'], 'Prava koža, ne za vegane', ['smeđa', 'crna'], 'limited edition', ['https://europa92.eu/upload/catalog/product/8467/thumb/39fb2ff7-4eab-45b3-a773-33bcaca0f060_6619befd8a722_990xr.webp']),
    new Proizvod(3, 'Elegantne cipele', 250, ['40', '41', '42', '43', '44'], 'Za posebne prilike, super su i za ples', ['crna', 'smeđa'], 'nije za kišu', ['https://img01.ztat.net/article/spp-media-p1/a9497d7f4c744e7b8bd453cca4915467/3c21cd79fb3e40b2b685060ee4479739.jpg?imwidth=1800&filter=packshot']),
    new Proizvod(4, 'Sunčane naočale Ray-Ban', 180, ['onesize'], 'Štite od sunca i dodaju +10 coolness bodova', ['crna', 'zlatna'], 'polarizirane', ['https://optika-anda.com/Documents/Products/32386/b546622b-ff5f-4e17-bb48-3b668ba02ead.png']),
];

export { proizvodi, Proizvod };