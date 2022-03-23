export class Trening{
    constructor(ID,DatumTermina,VremeTermina,TrajanjeUMinutima,Grupa,Vestina,Sala){
        this.ID=ID;
        this.DatumTermina=DatumTermina;
        this.VremeTermina=VremeTermina;
        this.TrajanjeUMinutima=TrajanjeUMinutima;
        this.Grupa=Grupa;
        this.Vestina=Vestina;
        this.Sala=Sala;
    }

    crtajTrening(host){
        if(!host)
            throw Error("dati host ne postoji");

        const blokOTreningu = document.createElement("div");
        blokOTreningu.classList.add("blokOTreneru");
        host.appendChild(blokOTreningu);

        this.kont=blokOTreningu;

        const blokOTreninguEmoji = document.createElement("div");
        blokOTreninguEmoji.classList.add("blokOTreneruEmoji");
        blokOTreningu.appendChild(blokOTreninguEmoji);
        
        const slika = document.createElement("img");
        slika.classList.add("slika");
        blokOTreninguEmoji.appendChild(slika);

        //const vestinaSlika = document.querySelector("#selectVestinu");
        //const vestinaSlikaValue = vestinaSlika.options[vestinaSlika.selectedIndex].value;

        if(this.Vestina=="Aikido")
            slika.src="/Slike/Aikido.png"
        else if(this.Vestina=="Karate")
            slika.src="/Slike/Karate2.png"
        else if(this.Vestina=="Džudo")
            slika.src="/Slike/Judo2.png"
        else if(this.Vestina=="Tekvondo")
            slika.src="/Slike/Tekvondo.png"

        const blokOTreninguInfo = document.createElement("div");
        blokOTreninguInfo.classList.add("blokOTreneruInfo");
        blokOTreningu.appendChild(blokOTreninguInfo);

        const blokOTreninguInfoInfo = document.createElement("div");
        blokOTreninguInfoInfo.classList.add("blokOTreneruInfoInfo");
        blokOTreninguInfoInfo.classList.add("blokOTreneruInfoInfo3");
        blokOTreninguInfo.appendChild(blokOTreninguInfoInfo);

        const blokOTreninguInfoDugme = document.createElement("div");
        blokOTreninguInfoDugme.classList.add("blokOTreneruInfoDugme");
        blokOTreninguInfo.appendChild(blokOTreninguInfoDugme);

        ////////////////////////////////////////

        const pDatum = document.createElement("p");
        pDatum.innerHTML=`datum: ${this.DatumTermina}`;
        blokOTreninguInfoInfo.appendChild(pDatum);

        let breakLine = document.createElement("br");
        host.appendChild(breakLine);

        let vremenaZaTreninge2 = [];
            vremenaZaTreninge2 = this.VremeTermina.split(':');

            for(let i=0;i<2;i++)
            {
                if(parseInt(vremenaZaTreninge2[i])<10)
                    {
                    let stringDodaj = "0";
                    stringDodaj = stringDodaj.concat(vremenaZaTreninge2[i]);
                    vremenaZaTreninge2[i]=stringDodaj;
                    }
            }
        
        const pVreme = document.createElement("p");
        pVreme.innerHTML=`vreme: ${vremenaZaTreninge2[0]}:${vremenaZaTreninge2[1]}`;
        blokOTreninguInfoInfo.appendChild(pVreme);


        let breakLine2 = document.createElement("br");
        host.appendChild(breakLine2);

        const pTTUM = document.createElement("p");
        pTTUM.innerHTML=`trajanje: ${this.TrajanjeUMinutima}`;
        blokOTreninguInfoInfo.appendChild(pTTUM);

        let breakLine3 = document.createElement("br");
        host.appendChild(breakLine3);

        const pGrupa = document.createElement("p");
        pGrupa.innerHTML=`grupa: ${this.Grupa}`;
        blokOTreninguInfoInfo.appendChild(pGrupa);

        let breakLine4 = document.createElement("br");
        host.appendChild(breakLine4);

        const pSala = document.createElement("p");
        pSala.innerHTML=`sala: ${this.Sala}`;
        blokOTreninguInfoInfo.appendChild(pSala);

        const dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.innerHTML="izmeni";
        blokOTreninguInfoDugme.appendChild(dugmeIzmeni);

        const dugmeIzbrisi = document.createElement("button");
        dugmeIzbrisi.innerHTML="obrisi";
        blokOTreninguInfoDugme.appendChild(dugmeIzbrisi);

        dugmeIzbrisi.onclick = () => {

            alert("trener je izbrisan");

            let roditelj = this.kont.parentNode;
            roditelj.removeChild(this.kont);

            fetch("https://localhost:5001/Trening/izbrisiTrening/"+this.ID+"/",
            {
                method:"DELETE"
            })
        }

        dugmeIzmeni.onclick = () => {
            const dugmeIzmeniDatum = document.querySelector("#inputIzmeniDatumTreninga");
            const dugmeIzmeniVreme = document.querySelector("#inputIzmeniVremeTreninga");
            const dugmeIzmeniTrajanje = document.querySelector("#inputIzmeniTrajanjeTreninga");
            const dugmeIzmeniGrupa= document.querySelector("#selectIzmeniGrupuTreninga");
            const dugmeIzmeniSala = document.querySelector("#selectIzmeniSaluTreninga");
            const dugmeIzmeniID = document.querySelector("#inputIzmeniIDTreninga");

            dugmeIzmeniID.value = this.ID;

            const datum1 = this.DatumTermina.replaceAll('/','-');
            let datumiZaTreninge = [];
            datumiZaTreninge = datum1.split('-');

            for(let i=0;i<3;i++)
            {
                if(parseInt(datumiZaTreninge[i])<10)
                    {
                    let stringDodaj = "0";
                    stringDodaj = stringDodaj.concat(datumiZaTreninge[i]);
                    datumiZaTreninge[i]=stringDodaj;
                    }
            }

            let vremenaZaTreninge = [];
            vremenaZaTreninge = this.VremeTermina.split(':');

            for(let i=0;i<2;i++)
            {
                if(parseInt(vremenaZaTreninge[i])<10)
                    {
                    let stringDodaj = "0";
                    stringDodaj = stringDodaj.concat(vremenaZaTreninge[i]);
                    vremenaZaTreninge[i]=stringDodaj;
                    }
            }



            const konacniDatum = `${datumiZaTreninge[0]}-${datumiZaTreninge[1]}-${datumiZaTreninge[2]}`;
            dugmeIzmeniDatum.value = konacniDatum;
            const konacnoVreme = `${vremenaZaTreninge[0]}:${vremenaZaTreninge[1]}`
            dugmeIzmeniVreme.value = konacnoVreme;
            dugmeIzmeniTrajanje.value = this.TrajanjeUMinutima;
            dugmeIzmeniGrupa.selectedIndex = this.Grupa - 1;
            


        }

    }
}