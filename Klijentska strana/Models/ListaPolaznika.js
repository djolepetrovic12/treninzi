/*export class ListaPolaznika{
    constructor(naziv){
        this.naziv=naziv;
        this.kontejner=null;
        this.listaP=[];
    }

    crtaj(host){
        if(!host)
            throw Error("host ne postoji");
        const tabela = document.createElement("table");
        tabela.className="tabela";
        host.appendChild(tabela);

        const redNaziva = document.createElement("thead");
        redNaziva.className="redNaziva";
        tabela.appendChild(redNaziva);

        const listaNaziva=["id","jmbg","ime","prezime","grupa"];

        let th;
        listaNaziva.forEach(el => {
            th = document.createElement("th");
            th.textContent=el;
            tabela.appendChild(th);
        });


        this.listaP.forEach((el)=> el.crtajPolaznika(tabela));

    }

    dodajPolaznike(polaznik){
        this.listaP.push(polaznik);
    }
}*/