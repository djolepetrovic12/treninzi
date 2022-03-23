import { Polaznik } from "./Models/Polaznik.js";
import { Vestina } from "./Models/Vestina.js";
import { Trener } from "./Models/Trener.js";
import { Sala } from "./Models/Sala.js";
import { TreneriPrikaz } from "./Models/TreneriPrikaz.js";
import { SalaPrikaz } from "./Models/SalaPrikaz.js";
import { PolaznikPrikaz } from "./Models/PolaznikPrikaz.js";
import { Trening } from "./Models/Trening.js";
import { TreningPrikaz } from "./Models/TreningPrikaz.js";


let listaVestina=[];
fetch("https://localhost:5001/Vestina/preuzmiVestine")
.then(p=>{
    p.json().then(vestine=>{    
        vestine.forEach(el=>{
            let vestinaEl = new Vestina(el.id,el.naziv);
            listaVestina.push(vestinaEl);
        });

        const selectVestinu = document.querySelector("#selectVestinu");

        let opt;
        listaVestina.forEach(vestinica=>{
            opt = document.createElement("option");
            opt.value = vestinica.ID;
            opt.innerHTML = vestinica.Naziv;
            selectVestinu.appendChild(opt);
        });
        const objekatIznad2 = document.querySelector(".Trener");
        objekatIznad2.appendChild(selectVestinu);
    })
});




crtajFormuPolaznika();

let listaPojaseva = [];
fetch("https://localhost:5001/VesPolSpoj/preuzmiPojaseve")
.then(p=>{
    p.json().then(pojasevi=>{
        pojasevi.forEach(el=>{
            listaPojaseva.push(el);
        });

    })
});



let listaSala = [];
fetch("https://localhost:5001/Sala/preuzmiSale")
.then(p=>{
    p.json().then(sale=>{
        sale.forEach(sala1 => {
            let sala2 = new Sala(sala1.id,sala1.adresa,sala1.imeLokacije);
            listaSala.push(sala2);
        });
            const selectSale = document.querySelector("#selectSalu");
            const izmenaSaleTrening = document.querySelector("#selectIzmeniSaluTreninga");
            
            listaSala.forEach(salaZaTrening=>{
                let opt4 = document.createElement("option");
                opt4.innerHTML=`${salaZaTrening.Adresa} (${salaZaTrening.ImeLokacije})`;
                opt4.value=salaZaTrening.ID;
                selectSale.appendChild(opt4);
            })

    });
});

let listaPolaznika = [];
fetch("https://localhost:5001/Polaznik/preuzmiPolaznike")
.then(p=>
    {
        p.json().then(polaznici =>
            {
                polaznici.forEach(polaznik => 
                    {
                        let polaznik1 = new Polaznik(polaznik.id,polaznik.jmbg,polaznik.ime,polaznik.prezime,polaznik.grupa);
                        listaPolaznika.push(polaznik1);
                    })
            })
    })


const dugmeTrening = document.querySelector("#dugmeTrening");
dugmeTrening.onclick = () => {
    const dugmeTreningDatum = document.querySelector("#datumTreninga");
    const dugmeTreningVreme = document.querySelector("#vremeTreninga");
    const dugmeTreningTTUM = document.querySelector("#trajanjeTreninga");
    const dugmeTreningGrupa = document.querySelector("#grupaTreninga");
    const dugmeTreningaSala = document.querySelector("#selectSalu");
    const dugmeTreningVestina = document.querySelector("#selectVestinu")
    

    fetch("https://localhost:5001/Trening/kreirajTrening/"+dugmeTreningDatum.value+"/"+dugmeTreningVreme.value+"/"+dugmeTreningTTUM.value+"/"+dugmeTreningGrupa.value+"/"+dugmeTreningaSala.value+"/"+dugmeTreningVestina.value+"/",
    {
        method:"POST"
    })
    .then(p=>
        {
            p.json();
        })
}



let listaTrenera = [];
const dugmeListaTrenera = document.querySelector("#trenKlik");
dugmeListaTrenera.onclick = () => {

    listaTrenera = [];

    const vestinaZaTrening = document.querySelector("#selectVestinu");
        fetch("https://localhost:5001/Trener/preuzmiTrenere/"+vestinaZaTrening.options[vestinaZaTrening.selectedIndex].value)
            .then(p=>{
                p.json().then(treneri1=>{
                    console.log(treneri1);
                    treneri1.forEach(trener1=>{
                        let trenerObject = new Trener(trener1.id,trener1.sifraTrenera,trener1.ime,trener1.prezime,trener1.vestinaID,trener1.vestinaNaziv);
                        listaTrenera.push(trenerObject);
                    });

                    let prikaz = new TreneriPrikaz();
                    console.log(listaTrenera); 
                    prikaz.dodajListuTrenera(listaTrenera);
                    const host1 = document.querySelector(".crtajListe");
                    prikaz.crtaj(host1);
                })
            })
            console.log(listaTrenera);


}

const dugmeListaSala = document.querySelector("#salaKlik");
dugmeListaSala.onclick = () => {
    let prikaz = new SalaPrikaz();
    prikaz.dodajListuSala(listaSala);
    const host1 = document.querySelector(".crtajListe");
    prikaz.crtaj(host1);
}


let listaPolaznika2 = [];
const dugmeListaPolaznika = document.querySelector("#polazKlik");
dugmeListaPolaznika.onclick = () => {

    const vrednostVestine = document.querySelector("#selectVestinu");

    listaPolaznika2 = [];
    fetch("https://localhost:5001/Polaznik/preuzmiPolaznike")
    .then(p=>
        {
            p.json().then(polaznici =>
                {
                    polaznici.forEach(polaznik => 
                        {
                            let polaznik1 = new Polaznik(polaznik.id,polaznik.jmbg,polaznik.ime,polaznik.prezime,polaznik.grupa);
                            listaPolaznika2.push(polaznik1);
                        })

                        let prikaz = new PolaznikPrikaz();
                        prikaz.dodajListuPolaznika(listaPolaznika);
                        const host1 = document.querySelector(".crtajListe");
                        prikaz.crtaj(host1);
                })
        })
}

let listaTreninga=[];
const dugmeListaTreninga = document.querySelector("#treningKlik");
dugmeListaTreninga.onclick = () => {

        listaTreninga = [];

        const vestinaZaTrening = document.querySelector("#selectVestinu");
        fetch("https://localhost:5001/Trening/preuzmiTrening/"+vestinaZaTrening.options[vestinaZaTrening.selectedIndex].value+"/",
        {
            method:"GET"
        })
        .then(p=>
            {
                p.json().then(treninzi=>
                    {
                        treninzi.forEach(trening=>
                            {
                                let trening1 = new Trening(trening.id,trening.terminDatum,trening.terminVreme,trening.trajanjeUMinutima,trening.grupa,trening.vestinaNaziv,trening.salaNaziv);
                                listaTreninga.push(trening1);
                            })

                        
                        let prikaz = new TreningPrikaz();
                        prikaz.dodajListuTreninga(listaTreninga);
                        const host1 = document.querySelector(".crtajListe");
                        prikaz.crtaj(host1);
                    })
            })


}

const btnZaDodavanjePolaznika = document.querySelector(".btnDodajPolaznika");
btnZaDodavanjePolaznika.onclick = () => {

    const formImePolaznika = document.querySelector("#imePolaznika");
    const formPrezimePolaznika = document.querySelector("#prezimePolaznika");
    const formGrupaPolaznika = document.querySelector("#selectGrupu");
    const formJMBGPolaznika = document.querySelector("#JMBGPolaznika1");
    const formVestinaPolaznika = document.querySelector("#selectVestinu");
    console.log(formVestinaPolaznika.options[formVestinaPolaznika.selectedIndex].value);
    const formPojasPolaznika = document.querySelector("#selectPojas");
    let IDPolaznika;

    fetch("https://localhost:5001/Polaznik/kreirajPolaznika/"+formImePolaznika.value+"/"+formPrezimePolaznika.value+"/"+formGrupaPolaznika.options[formGrupaPolaznika.selectedIndex].value+"/"+formJMBGPolaznika.value+"/",
    { 
        method:"POST"
    }).then(p=>
        {
            p.json().then(data => 
                {
                    fetch("https://localhost:5001/VesPolSpoj/dodajPojas/"+formPojasPolaznika.value+"/"+data.id+"/"+formVestinaPolaznika.options[formVestinaPolaznika.selectedIndex].value+"/",
                        {
                            method:"POST"
                        }).then(p=>{
                            if(p.ok){}
                        })
                })
        })

    


}

const btnZaDodavanjeTrenera = document.querySelector(".btnDodajTrenera");
btnZaDodavanjeTrenera.onclick = ()=>{

    const formImeTrenera = document.querySelector("#imeTrenera");
    const formPrezimeTrenera = document.querySelector("#prezimeTrenera");
    const formSifraTrenera = document.querySelector("#SifraTrenera");
    const formVestinaTrenera = document.querySelector("#selectVestinu");

    fetch("https://localhost:5001/Trener/dodajTrenera/"+formImeTrenera.value+"/"+formPrezimeTrenera.value+"/"+formSifraTrenera.value+"/"+formVestinaTrenera.options[formVestinaTrenera.selectedIndex].value+"/",
    {
        method:"POST"
    }).then(p=>
        {
            if(p.ok){}
        })
}


const btnZaDodavanjeSale = document.querySelector(".btnDodajSalu");
btnZaDodavanjeSale.onclick = () => {
    const formAdresaSale = document.querySelector("#adresaSale");
    const formImeLokacijeSale = document.querySelector("#imeLokacije");
    fetch("https://localhost:5001/Sala/dodajSalu/"+formAdresaSale.value+"/"+formImeLokacijeSale.value+"/",
    {
        method: "POST"
    }).then(p=>
        {
            if(p.ok){}
        }) 
}


function crtajFormuPolaznika() {
const divZaUpisPolaznika = document.querySelector(".upisPolaznika");


const div1 = document.createElement("div");
divZaUpisPolaznika.appendChild(div1);
const div2 = document.createElement("div");
divZaUpisPolaznika.appendChild(div2);
const div3 = document.createElement("div");
divZaUpisPolaznika.appendChild(div3);
const div4 = document.createElement("div");
divZaUpisPolaznika.appendChild(div4);
const div5 = document.createElement("div");
divZaUpisPolaznika.appendChild(div5);
const div6 = document.createElement("div");
divZaUpisPolaznika.appendChild(div6);
const div7 = document.createElement("div");
divZaUpisPolaznika.appendChild(div7);

const pUpisPolaznika = document.createElement("p");
pUpisPolaznika.textContent = "upisi polaznika";
div1.appendChild(pUpisPolaznika);

const lblImePolaznika = document.createElement("label");
lblImePolaznika.textContent = "ime polaznika:";
lblImePolaznika.htmlFor="imePolaznika";
div2.appendChild(lblImePolaznika);

const inputImePolaznika = document.createElement("input");
inputImePolaznika.type="text";
inputImePolaznika.size=30;
inputImePolaznika.placeholder="npr. Milos";
inputImePolaznika.id="imePolaznika";
inputImePolaznika.name="imePolaznika";
div2.appendChild(inputImePolaznika);

const lblPrezimePolaznika = document.createElement("label");
lblPrezimePolaznika.textContent = "prezime polaznika:";
lblPrezimePolaznika.htmlFor="prezimePolaznika";
div3.appendChild(lblPrezimePolaznika);

const inputPrezimePolaznika = document.createElement("input");
inputPrezimePolaznika.type="text";
inputPrezimePolaznika.size=30;
inputPrezimePolaznika.placeholder="npr. Petrovic";
inputPrezimePolaznika.id="prezimePolaznika";
inputPrezimePolaznika.name="prezimePolaznika";
div3.appendChild(inputPrezimePolaznika);

const lblGrupaPolaznika = document.createElement("label");
lblGrupaPolaznika.textContent = "Grupa za trening:";
lblGrupaPolaznika.htmlFor="GrupaPolaznika";
div4.appendChild(lblGrupaPolaznika);

const selectGrupuPolaznika = document.createElement("select");
selectGrupuPolaznika.name="selectGrupu";
selectGrupuPolaznika.id="selectGrupu";
div4.appendChild(selectGrupuPolaznika);
for(let i=1;i<=10;i++){
    let opt1 = document.createElement("option");
    opt1.value = i;
    opt1.innerHTML = i;
    selectGrupuPolaznika.appendChild(opt1);
}

const lblJMBGPolaznika = document.createElement("label");
lblJMBGPolaznika.textContent = "JMBG:";
lblJMBGPolaznika.htmlFor="JMBGPolaznika";
div5.appendChild(lblJMBGPolaznika);

const inputJMBGPolaznika = document.createElement("input");
inputJMBGPolaznika.type="text";
inputJMBGPolaznika.size=20;
inputJMBGPolaznika.placeholder="npr. 12010019228992";
inputJMBGPolaznika.id="JMBGPolaznika1";
inputJMBGPolaznika.name="JMBGPolaznika";
div5.appendChild(inputJMBGPolaznika);

let listaPojas=["beli","žuti","narandzasti","zeleni","plavi","ljubicasti","crveni","braon","crni"];

const lblPojasevi = document.createElement("label");
lblPojasevi.id="lblPojasPolaznika"
lblPojasevi.textContent = "Pojas:";
lblPojasevi.htmlFor="pojasPolaznika";
div6.appendChild(lblPojasevi);

const selectPojasPolaznika = document.createElement("select");
selectPojasPolaznika.name="selectPojas";
selectPojasPolaznika.id="selectPojas";
div6.appendChild(selectPojasPolaznika);
let pojas2;
listaPojas.forEach(pojas1 => {
    pojas2 = document.createElement("option");
    pojas2.innerHTML = pojas1;
    pojas2.value = pojas1;
    selectPojasPolaznika.appendChild(pojas2);
})


const buttonPolaznik = document.createElement("button");
buttonPolaznik.innerHTML="dodaj polaznika";
buttonPolaznik.className="btnDodajPolaznika";
div7.appendChild(buttonPolaznik);
}
