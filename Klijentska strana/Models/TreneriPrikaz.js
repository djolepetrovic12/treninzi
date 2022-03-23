import { Vestina } from "./Vestina.js";

export class TreneriPrikaz{

    constructor(){
        this.listaTrenera = [];
        this.kont = null;
    }

    dodajListuTrenera(listaTrenera){
        listaTrenera.forEach(element => {
            this.listaTrenera.push(element);
        });
    }

    crtaj(host){
        if(!host)
            throw Error("dati host ne postoji");

        const prikaz = document.querySelector(".spoljDiv");
        console.log(prikaz);
        if(prikaz!==null)
        {
            let roditelj = prikaz.parentNode;
            roditelj.removeChild(prikaz);
        }

        const spoljDiv = document.createElement("div");
        spoljDiv.classList.add("spoljDiv");
        spoljDiv.classList.add("spoljDivTreneri");
        host.appendChild(spoljDiv);
        
        const unutDivIzmene = document.createElement("div");
        unutDivIzmene.classList.add("unutDivIzmene");
        unutDivIzmene.classList.add("unutDivIzmeneTreneri");
        spoljDiv.appendChild(unutDivIzmene);
        
        const unutDivPodaci = document.createElement("div");
        unutDivPodaci.classList.add("unutDivIzmene");
        unutDivPodaci.classList.add("unutDivpodaciTreneri");   
        spoljDiv.appendChild(unutDivPodaci);

        this.crtajFormu(unutDivIzmene);

        
        this.listaTrenera.forEach(el=>
            {
                el.crtajTrenera(unutDivPodaci);
            })

        
    }

    crtajFormu(host){
        if(!host)
            throw new Error("dati host ne postoji");


        const div1 = document.createElement("div");
        div1.classList.add("div1");
        host.appendChild(div1);

        const div2 = document.createElement("div");
        div2.classList.add("div2");
        div2.classList.add("div2Treneri");
        host.appendChild(div2);

        const pIzmeni = document.createElement("p");
        pIzmeni.classList.add("pIzmeni");
        pIzmeni.innerHTML="izmeni trenera"
        div1.appendChild(pIzmeni);
        
        const divIme = document.createElement("div");
        divIme.classList.add("divIme");
        div2.appendChild(divIme);

        const divPrezime = document.createElement("div");
        divPrezime.classList.add("divPrezime");
        div2.appendChild(divPrezime);

        const divSifraTrenera = document.createElement("div");
        divSifraTrenera.classList.add("divSifraTrenera");
        div2.appendChild(divSifraTrenera);

        const divVestinaTrenera = document.createElement("div");
        divVestinaTrenera.classList.add("divVestinaTrenera");
        div2.appendChild(divVestinaTrenera);

        const divDugmeIzmeniTrenera = document.createElement("div");
        divDugmeIzmeniTrenera.classList.add("divPojas");
        div2.appendChild(divDugmeIzmeniTrenera);




        const lblIzmeniImeTrenera = document.createElement("label");
        lblIzmeniImeTrenera.textContent = "ime trenera:";
        lblIzmeniImeTrenera.htmlFor="izmeniImeTrenera";
        divIme.appendChild(lblIzmeniImeTrenera);

        const inputIzmeniImeTrenera = document.createElement("input");
        inputIzmeniImeTrenera.type="text";
        inputIzmeniImeTrenera.size=30;
        inputIzmeniImeTrenera.placeholder="npr. Milos";
        inputIzmeniImeTrenera.id="izmeniImeTrenera";
        inputIzmeniImeTrenera.name="izmeniImeTrenera";
        divIme.appendChild(inputIzmeniImeTrenera);

        const lblIzmeniPrezimeTrenera = document.createElement("label");
        lblIzmeniPrezimeTrenera.textContent = "prezime polaznika:";
        lblIzmeniPrezimeTrenera.htmlFor="izmeniPrezimeTrenera";
        divPrezime.appendChild(lblIzmeniPrezimeTrenera);

        const inputIzmeniPrezimeTrenera = document.createElement("input");
        inputIzmeniPrezimeTrenera.type="text";
        inputIzmeniPrezimeTrenera.size=30;
        inputIzmeniPrezimeTrenera.placeholder="npr. Petrovic";
        inputIzmeniPrezimeTrenera.id="izmeniPrezimeTrenera";
        inputIzmeniPrezimeTrenera.name="izmeniPrezimeTrenera";
        divPrezime.appendChild(inputIzmeniPrezimeTrenera);

        const lblIzmeniSifruTrenera = document.createElement("label");
        lblIzmeniSifruTrenera.textContent = "sifra polaznika:";
        lblIzmeniSifruTrenera.htmlFor="izmeniSifruTrenera";
        divSifraTrenera.appendChild(lblIzmeniSifruTrenera);

        const inputIzmeniSifruTrenera = document.createElement("input");
        inputIzmeniSifruTrenera.type="text";
        inputIzmeniSifruTrenera.size=30;
        inputIzmeniSifruTrenera.placeholder="npr. ME1111";
        inputIzmeniSifruTrenera.id="izmeniSifruTrenera";
        inputIzmeniSifruTrenera.name="izmeniSifruTrenera";
        divSifraTrenera.appendChild(inputIzmeniSifruTrenera);

        const lblIzmeniVestinuTrenera = document.createElement("label");
        lblIzmeniVestinuTrenera.className="lblIzmeniVestinuTrenera1";
        lblIzmeniVestinuTrenera.textContent = "vestina trenera:";
        lblIzmeniVestinuTrenera.htmlFor="izmeniVestinuTrenera1";
        divVestinaTrenera.appendChild(lblIzmeniVestinuTrenera);

        const selectIzmeniVestinuTrenera = document.createElement("select");
        selectIzmeniVestinuTrenera.name = "selectVestinuTrenera";
        selectIzmeniVestinuTrenera.id = "selectVestinuTrenera";
        divVestinaTrenera.appendChild(selectIzmeniVestinuTrenera);

        let listaVestina2 = [];

        fetch("https://localhost:5001/Vestina/preuzmiVestine")
        .then(p=>
            {
            p.json().then(vestine=>
                {
                    vestine.forEach(vestina21 => 
                    {
                        let vestinaObjekat = new Vestina(vestina21.id,vestina21.naziv)
                        listaVestina2.push(vestinaObjekat);
                    })

                    listaVestina2.forEach(el=>{
                    let optVest = document.createElement("option");
                    optVest.value = el.ID;
                    optVest.innerHTML = el.Naziv;
                    selectIzmeniVestinuTrenera.appendChild(optVest);
                    });
                })
            })

        let breakLine6 = document.createElement("br");
        host.appendChild(breakLine6);
        
        const dugmeIzmeniTrenera = document.createElement("button");
        dugmeIzmeniTrenera.innerHTML="izmeni trenera";
        divDugmeIzmeniTrenera.appendChild(dugmeIzmeniTrenera);
        dugmeIzmeniTrenera.onclick = () => {
            const infoIme = document.querySelector("#izmeniImeTrenera");
            const infoPrezime = document.querySelector("#izmeniPrezimeTrenera");
            const infoSifra = document.querySelector("#izmeniSifruTrenera");
            const infoVestina = document.querySelector("#selectVestinuTrenera");

            

            fetch("https://localhost:5001/Trener/izmeniTrenera/"+ infoIme.value+"/"+infoPrezime.value+"/"+infoSifra.value+"/"+infoVestina.options[infoVestina.selectedIndex].value+"/",
            {
                method:"PUT"
            })
            .then(p=>
                {
                    if(!p.ok)
                        throw new Error(p.status);
                    else if(p.ok){
                        alert(p.status);
                    }
                })
        }
    }

}