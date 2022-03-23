export class PolaznikPrikaz{
    constructor(){
        this.listaPolaznika=[];
        this.kontejner=null;
    }

    dodajListuPolaznika(listaPolaznika){
        listaPolaznika.forEach(element => {
            this.listaPolaznika.push(element);
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
        spoljDiv.classList.add("spoljDivPolaznici");
        host.appendChild(spoljDiv);
        
        const unutDivIzmene2 = document.createElement("div");
        unutDivIzmene2.classList.add("unutDivIzmene");
        unutDivIzmene2.classList.add("unutDivIzmenePolaznici");
        spoljDiv.appendChild(unutDivIzmene2);
        
        const unutDivPodaci2 = document.createElement("div");
        unutDivPodaci2.classList.add("unutDivPodaci");
        spoljDiv.appendChild(unutDivPodaci2);

        this.crtajFormu(unutDivIzmene2);
        this.crtajZaglavljeTabele(unutDivPodaci2);
    }

    crtajFormu(host){
        if(!host)
            throw new Error("dati host ne postoji");
        
        const div1 = document.createElement("div");
        div1.classList.add("div1");
        host.appendChild(div1);

        const div2 = document.createElement("div");
        div2.classList.add("div2");
        host.appendChild(div2);

        const pIzmeni = document.createElement("p");
        pIzmeni.classList.add("pIzmeni");
        pIzmeni.innerHTML="izmeni polaznika"
        div1.appendChild(pIzmeni);
        
        const divIme = document.createElement("div");
        divIme.classList.add("divIme");
        div2.appendChild(divIme);

        const divPrezime = document.createElement("div");
        divPrezime.classList.add("divPrezime");
        div2.appendChild(divPrezime);

        const divGrupaTrening = document.createElement("div");
        divGrupaTrening.classList.add("divGrupaTrening");
        div2.appendChild(divGrupaTrening);

        const divJMBG = document.createElement("div");
        divJMBG.classList.add("divJMBG");
        div2.appendChild(divJMBG);

        const divPojas = document.createElement("div");
        divPojas.classList.add("divPojas");
        div2.appendChild(divPojas);

        const divDugmeIzmeniPolaznika = document.createElement("div");
        divDugmeIzmeniPolaznika.classList.add("divDugmeIzmeniPolaznika");
        div2.appendChild(divDugmeIzmeniPolaznika);

        const lblIzmeniImePolazika = document.createElement("label");
        lblIzmeniImePolazika.textContent = "ime polaznika:";
        lblIzmeniImePolazika.htmlFor="inputIzmeniImePolazika";
        divIme.appendChild(lblIzmeniImePolazika);

        const inputIzmeniImePolazika = document.createElement("input");
        inputIzmeniImePolazika.type="text";
        inputIzmeniImePolazika.size=30;
        inputIzmeniImePolazika.placeholder="npr. Petar";
        inputIzmeniImePolazika.id="inputIzmeniImePolazika";
        inputIzmeniImePolazika.name="inputIzmeniImePolazika";
        divIme.appendChild(inputIzmeniImePolazika);

        const lblIzmeniPrezimePolazika = document.createElement("label");
        lblIzmeniPrezimePolazika.textContent = "prezime polaznika:";
        lblIzmeniPrezimePolazika.htmlFor="inputIzmeniPrezimePolazika";
        divPrezime.appendChild(lblIzmeniPrezimePolazika);

        const inputIzmeniPrezimePolazika = document.createElement("input");
        inputIzmeniPrezimePolazika.type="text";
        inputIzmeniPrezimePolazika.size=30;
        inputIzmeniPrezimePolazika.placeholder="npr. Petar";
        inputIzmeniPrezimePolazika.id="inputIzmeniPrezimePolazika";
        inputIzmeniPrezimePolazika.name="inputIzmeniPrezimePolazika";
        divPrezime.appendChild(inputIzmeniPrezimePolazika);

        const lblIzmeniGrupuPolazika = document.createElement("label");
        lblIzmeniGrupuPolazika.textContent = "grupa polaznika:";
        lblIzmeniGrupuPolazika.htmlFor="inputIzmeniGrupuPolazika";
        divGrupaTrening.appendChild(lblIzmeniGrupuPolazika);

        const inputIzmeniGrupuPolazika = document.createElement("select");
        inputIzmeniGrupuPolazika.id="inputIzmeniGrupuPolazika";
        inputIzmeniGrupuPolazika.name="inputIzmeniGrupuPolazika";
        divGrupaTrening.appendChild(inputIzmeniGrupuPolazika);

        let opt;
        for(let i=1;i<=10;i++){
            opt = document.createElement("option");
            opt.innerHTML = i;
            opt.value=i;
            inputIzmeniGrupuPolazika.appendChild(opt);
        }

        const lblIzmeniJMBGPolazika = document.createElement("label");
        lblIzmeniJMBGPolazika.textContent = "JMBG polaznika:";
        lblIzmeniJMBGPolazika.htmlFor="inputIzmeniJMBGPolazika";
        divJMBG.appendChild(lblIzmeniJMBGPolazika);

        const inputIzmeniJMBGPolazika = document.createElement("input");
        inputIzmeniJMBGPolazika.type="text";
        inputIzmeniJMBGPolazika.size=30;
        inputIzmeniJMBGPolazika.placeholder="npr. 1209004010203";
        inputIzmeniJMBGPolazika.id="inputIzmeniJMBGPolazika";
        inputIzmeniJMBGPolazika.name="inputIzmeniJMBGPolazika";
        divJMBG.appendChild(inputIzmeniJMBGPolazika);

        const lblIzmeniPojasPolazika = document.createElement("label");
        lblIzmeniPojasPolazika.textContent = "pojas polaznika:";
        lblIzmeniPojasPolazika.htmlFor="lblIzmeniPojasPolazika";
        divPojas.appendChild(lblIzmeniPojasPolazika);

        const inputIzmeniPojasPolazika = document.createElement("select");
        inputIzmeniPojasPolazika.id="inputIzmeniPojasPolazika";
        inputIzmeniPojasPolazika.name="inputIzmeniPojasPolazika";
        divPojas.appendChild(inputIzmeniPojasPolazika);

        const inputIzmeniIDPolazika = document.createElement("input");
        inputIzmeniIDPolazika.type="text";
        inputIzmeniIDPolazika.id="inputIzmeniIDPolazika";
        inputIzmeniIDPolazika.name="inputIzmeniIDPolazika";
        divPojas.appendChild(inputIzmeniIDPolazika);

        let spisakPojaseva = ["beli","žuti","narandzasti","zeleni","plavi","ljubicasti","crveni","braon","crni"];
        spisakPojaseva.forEach(p=>
            {
                let opt = document.createElement("option");
                opt.innerHTML = p;
                opt.value = p;
                inputIzmeniPojasPolazika.appendChild(opt);
            })
        
        const dugmeIzmeniPolaznika = document.createElement("button");
        dugmeIzmeniPolaznika.innerHTML="izmeni polaznika";
        divDugmeIzmeniPolaznika.appendChild(dugmeIzmeniPolaznika);

        dugmeIzmeniPolaznika.onclick = () => {
            fetch("https://localhost:5001/Polaznik/izmeniPolaznika/"+inputIzmeniIDPolazika.value+"/"+inputIzmeniImePolazika.value+"/"+inputIzmeniPrezimePolazika.value+"/"+inputIzmeniGrupuPolazika.value+"/"+inputIzmeniJMBGPolazika.value+"/",
            {
                method:"PUT"
            }).then(p => 
                {
                    p.json().then(data => 
                        {
                            fetch("https://localhost:5001/VesPolSpoj/izmeniPojas/"+inputIzmeniPojasPolazika.options[inputIzmeniPojasPolazika.selectedIndex].innerHTML+"/"+data.id+"/",
                            {
                                method:"PUT"
                            }).then(d => 
                                {
                                    if(d.ok){}
                                })
                        })
                })


        }


    }

    crtajZaglavljeTabele(host){
        if(!host)
            throw new Error("dati host ne postoji");

        const tabela = document.createElement("table");
        tabela.classList.add("tabelaPolaznika");
        host.appendChild(tabela);

        const tr = document.createElement("tr");
        tabela.appendChild(tr);

        const tabelaIme = document.createElement("td");
        tabelaIme.innerHTML="Ime";
        tr.appendChild(tabelaIme);

        const tabelaPrezime = document.createElement("td");
        tabelaPrezime.innerHTML="Prezime";
        tr.appendChild(tabelaPrezime);

        const tabelaJMBG = document.createElement("td");
        tabelaJMBG.innerHTML="JMBG";
        tr.appendChild(tabelaJMBG);

        const tabelaGrupa = document.createElement("td");
        tabelaGrupa.innerHTML="Grupa";
        tr.appendChild(tabelaGrupa);

        const tabelaPojas = document.createElement("td");
        tabelaPojas.innerHTML="Pojas";
        tr.appendChild(tabelaPojas);

        this.listaPolaznika.forEach(p=>
            {
                p.crtajRed(tabela);
            })
    }

}