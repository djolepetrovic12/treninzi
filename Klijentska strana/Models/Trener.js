export class Trener{
    constructor(ID,sifraTrenera,Ime,Prezime,VestinaID,VestinaNaziv){
        this.ID=ID;
        this.sifraTrenera=sifraTrenera;
        this.Ime=Ime;
        this.Prezime=Prezime;
        this.VestinaNaziv = VestinaNaziv;
        this.VestinaID = VestinaID;
        this.kont=null;
    }

    crtajTrenera(host){
        if(!host)
            throw Error("dati host ne postoji");
            
        const blokOTreneru = document.createElement("div");
        blokOTreneru.classList.add("blokOTreneru");
        host.appendChild(blokOTreneru);

        this.kont=blokOTreneru;

        const blokOTreneruEmoji = document.createElement("div");
        blokOTreneruEmoji.classList.add("blokOTreneruEmoji");
        blokOTreneru.appendChild(blokOTreneruEmoji);

        const slika = document.createElement("img");
        slika.classList.add("slika");
        blokOTreneruEmoji.appendChild(slika);
        if(this.VestinaNaziv=="Aikido")
            slika.src="/Slike/Aikido.png"
        else if(this.VestinaNaziv=="Karate")
            slika.src="/Slike/Karate2.png"
        else if(this.VestinaNaziv=="Džudo")
            slika.src="/Slike/Judo2.png"
        else if(this.VestinaNaziv=="Tekvondo")
            slika.src="/Slike/Tekvondo.png"

        const blokOTreneruInfo = document.createElement("div");
        blokOTreneruInfo.classList.add("blokOTreneruInfo");
        blokOTreneru.appendChild(blokOTreneruInfo);

        const blokOTreneruInfoInfo = document.createElement("div");
        blokOTreneruInfoInfo.classList.add("blokOTreneruInfoInfo");
        blokOTreneruInfoInfo.classList.add("blokOTreneruInfoInfo2");
        blokOTreneruInfo.appendChild(blokOTreneruInfoInfo);

        const blokOTreneruInfoDugme = document.createElement("div");
        blokOTreneruInfoDugme.classList.add("blokOTreneruInfoDugme");
        blokOTreneruInfo.appendChild(blokOTreneruInfoDugme);

        const pIme = document.createElement("p");
        pIme.innerHTML=`ime: ${this.Ime}`;
        blokOTreneruInfoInfo.appendChild(pIme);

        let breakLine = document.createElement("br");
        host.appendChild(breakLine);

        const pPrezime = document.createElement("p");
        pPrezime.innerHTML=`prezime: ${this.Prezime}`;
        blokOTreneruInfoInfo.appendChild(pPrezime);

        let breakLine2 = document.createElement("br");
        host.appendChild(breakLine2);

        const pSifraTrenera = document.createElement("p");
        pSifraTrenera.innerHTML=`sifra: ${this.sifraTrenera}`;
        blokOTreneruInfoInfo.appendChild(pSifraTrenera);

        let breakLine3 = document.createElement("br");
        host.appendChild(breakLine3);

        const pVestina = document.createElement("p");
        pVestina.innerHTML=`Vestina: ${this.VestinaNaziv}`;
        blokOTreneruInfoInfo.appendChild(pVestina);


        const dugmeIzmeni = document.createElement("button");
        dugmeIzmeni.innerHTML="izmeni";
        blokOTreneruInfoDugme.appendChild(dugmeIzmeni);

        const dugmeIzbrisi = document.createElement("button");
        dugmeIzbrisi.innerHTML="obrisi";
        blokOTreneruInfoDugme.appendChild(dugmeIzbrisi);

        dugmeIzmeni.onclick = () => {
            const imeime = document.querySelector("#izmeniImeTrenera");
            const prezimeprezime = document.querySelector("#izmeniPrezimeTrenera");
            const sifrasifra = document.querySelector("#izmeniSifruTrenera");
            
            imeime.value = this.Ime;
            prezimeprezime.value = this.Prezime;
            sifrasifra.value = this.sifraTrenera;

        }

        dugmeIzbrisi.onclick = () => {

            alert("trener je izbrisan");

            let roditelj = this.kont.parentNode;
            roditelj.removeChild(this.kont);

            fetch("https://localhost:5001/Trener/obrisiTrenera/"+this.ID+"/",
            {
                method:"DELETE"
            })

        }

    }
}