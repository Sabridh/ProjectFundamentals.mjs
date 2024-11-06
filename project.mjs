import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

const prijzen = { W: 10, B: 2, F: 3 };
const btwTarieven = { W: 21, B: 6, F: 12 };

let mandGrootte = 0;
let cadeauMand = [];

function startProgramma() {
    vraagOmMandGrootte();
}

function vraagOmMandGrootte() {
    rl.question("Hoeveel cadeaus wil je in je mand (3 tot 20 items)? ", (antwoord) => {
        mandGrootte = parseInt(antwoord);

        if (isGeldigeGrootte(mandGrootte)) {
            kiesCadeaus();
        } else {
            console.log("Oei! Dat klopt niet. Geef een getal tussen 3 en 20!");
            vraagOmMandGrootte();
        }
    });
}

function isGeldigeGrootte(grootte) {
    return grootte >= 3 && grootte <= 20;
}

function kiesCadeaus() {
    if (cadeauMand.length < mandGrootte) {
        rl.question("Kies een cadeau (W voor Wijn, B voor Bier, F voor Fruitsap): ", (keuze) => {
            if (isGeldigeKeuze(keuze)) {
                voegCadeauMetBonusToe(keuze);
                kiesCadeaus();
            } else {
                console.log("Sorry, dat is geen geldige keuze. Probeer opnieuw!");
                kiesCadeaus();
            }
        });
    } else {
        berekenEnToonTotaal();
    }
}

function isGeldigeKeuze(keuze) {
    return keuze === "W" || keuze === "B" || keuze === "F";
}

function voegCadeauMetBonusToe(keuze) {
    cadeauMand.push(keuze);

    if (Math.random() < 0.1) {
        console.log("Gefeliciteerd! Je hebt een extra cadeau gewonnen!");
        cadeauMand.push(keuze);
    }
}

function berekenEnToonTotaal() {
    const totaal = berekenTotaal();
    console.log(`De totale waarde van je cadeaumand is: €${totaal}`);

    const totaalInclusiefBTW = berekenTotaalMetBTW();
    console.log(`Inclusief BTW komt het totaal op: €${totaalInclusiefBTW.toFixed(2)}`);

    rl.close();
}

function berekenTotaal() {
    let totaal = 0;
    for (let item of cadeauMand) {
        totaal += prijzen[item];
    }
    return totaal;
}

function berekenTotaalMetBTW() {
    let totaalMetBTW = 0;
    for (let item of cadeauMand) {
        const btw = prijzen[item] * (btwTarieven[item] / 100);
        totaalMetBTW += prijzen[item] + btw;
    }
    return totaalMetBTW;
}

startProgramma();

