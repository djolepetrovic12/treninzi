export class SalaPrikaz{
    constructor(){
        this.listaSala=[];
        this.kont=null;
    }

    dodajListuSala(listaSala){
        listaSala.forEach(element => {
            this.listaSala.push(element);
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
        unutDivIzmene.classList.add("unutDivIzmeneDisplayProp")
        spoljDiv.appendChild(unutDivIzmene);

        const unutDivPodaci = document.createElement("div");
        unutDivPodaci.classList.add("unutDivPodaci");
        spoljDiv.appendChild(unutDivPodaci);

        this.crtajFormu(unutDivIzmene);
        this.crtajZaglavljeTabele(unutDivPodaci);
    }

crtajFormu(host){
        if(!host)
            throw new Error("dati host ne postoji");

        const divAdresa = document.createElement("div");
        divAdresa.classList.add("divAdresa");
        host.appendChild(divAdresa);

        const divImeLokacije = document.createElement("div");
        divImeLokacije.classList.add("divImeLokacije");
        host.appendChild(divImeLokacije);

        const divDugme = document.createElement("div");
        divDugme.classList.add("divDugme");
        host.appendChild(divDugme);

        const lblIzmeniAdresu = document.createElement("label");
        lblIzmeniAdresu.textContent = "Adresa sale:";
        lblIzmeniAdresu.htmlFor="izmeniAdresu";
        divAdresa.appendChild(lblIzmeniAdresu);

        const inputIzmeniAdresu = document.createElement("input");
        inputIzmeniAdresu.type="text";
        inputIzmeniAdresu.size=30;
        inputIzmeniAdresu.placeholder="npr. Boška Buhe 5";
        inputIzmeniAdresu.id="izmeniAdresu";
        inputIzmeniAdresu.name="izmeniAdresu";
        divAdresa.appendChild(inputIzmeniAdresu);

        const lblIzmeniImeLokacije = document.createElement("label");
        lblIzmeniImeLokacije.textContent = "Ime lokacije:";
        lblIzmeniImeLokacije.htmlFor="izmeniImeLokacije";
        divImeLokacije.appendChild(lblIzmeniImeLokacije);

        const inputIzmeniImeLokacije = document.createElement("input");
        inputIzmeniImeLokacije.type="text";
        inputIzmeniImeLokacije.size=30;
        inputIzmeniImeLokacije.placeholder="npr. Sala 3";
        inputIzmeniImeLokacije.id="izmeniImeLokacije";
        inputIzmeniImeLokacije.name="izmeniImeLokacije";
        divImeLokacije.appendChild(inputIzmeniImeLokacije);

        const dugmeIzmeniSalu = document.createElement("button");
        dugmeIzmeniSalu.innerHTML="izmeni salu";
        divDugme.appendChild(dugmeIzmeniSalu);

        const IDZaIzmenu = document.createElement("input");
        IDZaIzmenu.type="text";
        IDZaIzmenu.name="ovdePisiID";
        IDZaIzmenu.classList.add("IDZaIzmenu");
        divImeLokacije.appendChild(IDZaIzmenu);

        dugmeIzmeniSalu.onclick = () => {
            fetch("https://localhost:5001/Sala/izmeniSalu/"+IDZaIzmenu.value+"/"+inputIzmeniAdresu.value+"/"+inputIzmeniImeLokacije.value+"/",
            {
                method:"PUT"
            }).then(p => 
                {
                    if(!p.ok)
                        throw new Error(p.status);
                    else if(p.ok){
                        alert(p.status);
                    }
                })
        }

        }

    crtajZaglavljeTabele(host){
        if(!host)
            throw new Error("dati host ne postoji");

        const tabela = document.createElement("table");
        tabela.classList.add("tabelaSala");
        host.appendChild(tabela);

        const tr = document.createElement("tr");
        tabela.appendChild(tr);

        const tabelaAdresa = document.createElement("td");
        tabelaAdresa.innerHTML="Adresa";
        tr.appendChild(tabelaAdresa);
        const tabelaImeLokacije = document.createElement("td");
        tabelaImeLokacije.innerHTML="Ime lokacije";
        tr.appendChild(tabelaImeLokacije);
        this.listaSala.forEach(p=>
            {
                p.crtajRed(tabela);
            })
    }
}