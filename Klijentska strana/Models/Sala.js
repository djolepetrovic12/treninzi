export class Sala{
    constructor(ID,Adresa,ImeLokacije){
        this.ID=ID;
        this.Adresa=Adresa;
        this.ImeLokacije=ImeLokacije;
        this.kont=null;
    }

    crtajRed(host){
        if(!host)
            throw new Error("dati host ne postoji");

        const trSala = document.createElement("tr");
        host.appendChild(trSala);
        this.kont = trSala;

        const tdAdresa = document.createElement("td");
        tdAdresa.innerHTML=this.Adresa;
        trSala.appendChild(tdAdresa);

        const tdImeLokacije = document.createElement("td");
        tdImeLokacije.innerHTML=this.ImeLokacije;
        trSala.appendChild(tdImeLokacije);

        const tdizmeni = document.createElement("td");
        trSala.appendChild(tdizmeni);

        const tdObrisi = document.createElement("td");
        trSala.appendChild(tdObrisi);

        const tdBtnIzmeni = document.createElement("button");
        tdBtnIzmeni.innerHTML="izmeni";
        tdizmeni.appendChild(tdBtnIzmeni);
        const tdbtnObrisi = document.createElement("button");
        tdbtnObrisi.innerHTML="obrisi";
        tdObrisi.appendChild(tdbtnObrisi);

        tdBtnIzmeni.onclick = () => {
            const upisiUformu1 = document.querySelector("#izmeniAdresu");
            const upisiUformu2 = document.querySelector("#izmeniImeLokacije");
            const upisiUformu3 = document.querySelector(".IDZaIzmenu");
            upisiUformu1.value = this.Adresa;
            upisiUformu2.value = this.ImeLokacije;
            upisiUformu3.value = this.ID;
        }

        tdbtnObrisi.onclick = () => {
            alert("sala je izbrisana");

            let roditelj = this.kont.parentNode;
            roditelj.removeChild(this.kont);

            fetch("https://localhost:5001/Sala/obrisiSalu/"+this.ID+"/",
            {
                method:"DELETE"
            })
        }

    }

}