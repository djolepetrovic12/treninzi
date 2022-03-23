
import { Sala } from "./Sala.js";
export class TreningPrikaz{
    constructor(){
        this.listaTreninga=[];
        this.kont=null;
    }

    dodajListuTreninga(listaTreninga){
        listaTreninga.forEach(element => {
            this.listaTreninga.push(element);
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
        host.appendChild(spoljDiv);

        const unutDivIzmene = document.createElement("div");
        unutDivIzmene.classList.add("unutDivIzmene");
        unutDivIzmene.classList.add("klasa1");
        spoljDiv.appendChild(unutDivIzmene);

        const unutDivPodaci = document.createElement("div");
        unutDivPodaci.classList.add("unutDivPodaci");
        unutDivPodaci.classList.add("klasa2");
        spoljDiv.appendChild(unutDivPodaci);

        this.crtajFormu(unutDivIzmene);

        this.listaTreninga.forEach(el=>
            {
                el.crtajTrening(unutDivPodaci);
            })
    }

    crtajFormu(host){
        if(!host)
            throw new Error("dati host ne postoji");
        
        const div1 = document.createElement("div");
        div1.classList.add("div1");
        div1.classList.add("div1Trening");
        host.appendChild(div1);

        const div2 = document.createElement("div");
        div2.classList.add("div2");
        div2.classList.add("div2Trening");
        host.appendChild(div2);

        const pIzmeni = document.createElement("p");
        pIzmeni.classList.add("pIzmeni");
        pIzmeni.innerHTML="izmeni trening"
        div1.appendChild(pIzmeni);
        
        const divDatum = document.createElement("div");
        divDatum.classList.add("divDatum");
        div2.appendChild(divDatum);

        const divVreme = document.createElement("div");
        divVreme.classList.add("divVreme");
        div2.appendChild(divVreme);

        const divTTUM = document.createElement("div");
        divTTUM.classList.add("divTTUM");
        div2.appendChild(divTTUM);

        const divGrupa = document.createElement("div");
        divGrupa.classList.add("divGrupa");
        div2.appendChild(divGrupa);

        const divSala = document.createElement("div");
        divSala.classList.add("divSala");
        div2.appendChild(divSala);

        const divDugmeIzmeniTrening = document.createElement("div");
        divDugmeIzmeniTrening.classList.add("divDugmeIzmeniTrening");
        div2.appendChild(divDugmeIzmeniTrening);

        const lblIzmeniDatumTreninga = document.createElement("label");
        lblIzmeniDatumTreninga.textContent = "datum treninga:";
        lblIzmeniDatumTreninga.htmlFor="inputIzmeniDatumTreninga";
        divDatum.appendChild(lblIzmeniDatumTreninga);

        const inputIzmeniDatumTreninga = document.createElement("input");
        inputIzmeniDatumTreninga.type="date";
        inputIzmeniDatumTreninga.id="inputIzmeniDatumTreninga";
        inputIzmeniDatumTreninga.name="inputIzmeniDatumTreninga";
        divDatum.appendChild(inputIzmeniDatumTreninga);

        const lblIzmeniVremeTreninga = document.createElement("label");
        lblIzmeniVremeTreninga.textContent = "vreme treninga:";
        lblIzmeniVremeTreninga.htmlFor="inputIzmeniVremeTreninga";
        divVreme.appendChild(lblIzmeniVremeTreninga);

        const inputIzmeniVremeTreninga = document.createElement("input");
        inputIzmeniVremeTreninga.type="time";
        inputIzmeniVremeTreninga.id="inputIzmeniVremeTreninga";
        inputIzmeniVremeTreninga.name="inputIzmeniVremeTreninga";
        divVreme.appendChild(inputIzmeniVremeTreninga);

        const lblIzmeniTrajanjeTreninga = document.createElement("label");
        lblIzmeniTrajanjeTreninga.textContent = "vreme treninga:";
        lblIzmeniTrajanjeTreninga.htmlFor="inputIzmeniVremeTreninga";
        divTTUM.appendChild(lblIzmeniTrajanjeTreninga);

        const inputIzmeniTrajanjeTreninga = document.createElement("input");
        inputIzmeniTrajanjeTreninga.type="number";
        inputIzmeniTrajanjeTreninga.min=1;
        inputIzmeniTrajanjeTreninga.max=120;
        inputIzmeniTrajanjeTreninga.id="inputIzmeniTrajanjeTreninga";
        inputIzmeniTrajanjeTreninga.name="inputIzmeniTrajanjeTreninga";
        divTTUM.appendChild(inputIzmeniTrajanjeTreninga);

        const lblIzmeniGrupuTreninga = document.createElement("label");
        lblIzmeniGrupuTreninga.textContent = "grupa treninga:";
        lblIzmeniGrupuTreninga.htmlFor="selectIzmeniGrupuTreninga";
        divGrupa.appendChild(lblIzmeniGrupuTreninga);

        const selectIzmeniGrupuTreninga = document.createElement("select");
        selectIzmeniGrupuTreninga.id="selectIzmeniGrupuTreninga";
        selectIzmeniGrupuTreninga.name="selectIzmeniGrupuTreninga";
        divGrupa.appendChild(selectIzmeniGrupuTreninga);

        for(let i=1;i<=10;i++)
        {
            let optGrupa = document.createElement("option");
            optGrupa.innerHTML = i;
            optGrupa.value = i;
            selectIzmeniGrupuTreninga.appendChild(optGrupa);
        }

        const lblIzmeniSaluTreninga = document.createElement("label");
        lblIzmeniSaluTreninga.textContent = "sala treninga:";
        lblIzmeniSaluTreninga.htmlFor="selectIzmeniSaluTreninga";
        divSala.appendChild(lblIzmeniSaluTreninga);

        const selectIzmeniSaluTreninga = document.createElement("select");
        selectIzmeniSaluTreninga.id="selectIzmeniSaluTreninga";
        selectIzmeniSaluTreninga.name="selectIzmeniSaluTreninga";
        divSala.appendChild(selectIzmeniSaluTreninga);

        const inputIzmeniIDTreninga = document.createElement("input");
        inputIzmeniIDTreninga.id="inputIzmeniIDTreninga";
        inputIzmeniIDTreninga.name="inputIzmeniIDTreninga";
        divSala.appendChild(inputIzmeniIDTreninga);

        const DugmeIzmeniTrening = document.createElement("button");
        DugmeIzmeniTrening.id="DugmeIzmeniTrening";
        DugmeIzmeniTrening.name="DugmeIzmeniTrening";
        DugmeIzmeniTrening.innerHTML="izmeni trening";
        divDugmeIzmeniTrening.appendChild(DugmeIzmeniTrening);


        let listaSala2 = [];
        fetch("https://localhost:5001/Sala/preuzmiSale")
            .then(p=>{
            p.json().then(sale=>{
                sale.forEach(sala1 => {
                    let sala3 = new Sala(sala1.id,sala1.adresa,sala1.imeLokacije);
                    listaSala2.push(sala3);
                });                        
                    listaSala2.forEach(salaZaTrening=>{
                        let opt6 = document.createElement("option");
                        opt6.innerHTML=`${salaZaTrening.Adresa} (${salaZaTrening.ImeLokacije})`;
                        opt6.value=salaZaTrening.ID;
                        selectIzmeniSaluTreninga.appendChild(opt6);
                    })
            });
        });

        DugmeIzmeniTrening.onclick = () => {
            console.log(inputIzmeniIDTreninga.value,inputIzmeniDatumTreninga.value,inputIzmeniVremeTreninga.value,inputIzmeniTrajanjeTreninga.value,selectIzmeniGrupuTreninga.options[selectIzmeniGrupuTreninga.selectedIndex].innerHTML,selectIzmeniSaluTreninga.options[selectIzmeniSaluTreninga.selectedIndex].innerHTML);
            fetch("https://localhost:5001/Trening/izmeniTrening/"+inputIzmeniIDTreninga.value+"/"+inputIzmeniDatumTreninga.value+"/"+inputIzmeniVremeTreninga.value+"/"+inputIzmeniTrajanjeTreninga.value+"/"+selectIzmeniGrupuTreninga.options[selectIzmeniGrupuTreninga.selectedIndex].value+"/"+selectIzmeniSaluTreninga.options[selectIzmeniSaluTreninga.selectedIndex].value+"/",
            {
                method:"PUT"
            }).then(p=> 
                {
                    if(p.ok){}
                })

        }



    }



}