    export class Polaznik{
        constructor(ID,JMBG,Ime,Prezime,Grupa) {
            this.kontejner=null;
            this.ID=ID;
            this.JMBG=JMBG;
            this.Ime=Ime;
            this.Prezime=Prezime;
            this.Grupa=Grupa;
        }

        crtajRed(host){
            if(!host)
                throw Error("host ne postoji");
            const redTabela = document.createElement("tr");
            host.appendChild(redTabela);

            const elemenat2 = document.createElement("td");
            elemenat2.innerHTML=this.Ime;
            redTabela.appendChild(elemenat2);
                        
            const elemenat3 = document.createElement("td");
            elemenat3.innerHTML=this.Prezime;
            redTabela.appendChild(elemenat3);

            const elemenat1 = document.createElement("td");
            elemenat1.innerHTML=this.JMBG;
            redTabela.appendChild(elemenat1);

            const elemenat4 = document.createElement("td");
            elemenat4.innerHTML=this.Grupa;
            redTabela.appendChild(elemenat4);

            const trenerVestina = document.querySelector(".selectTrener");
            let PolaznikPojas;

            const elemenat0 = document.createElement("td");
            redTabela.appendChild(elemenat0);
            
            fetch("https://localhost:5001/VesPolSpoj/preuzmiPojasPoID/"+this.ID+"/",
            {
                method:"GET"
            }).then(p => 
                {
                    p.json().then(pojas => 
                        {
                            console.log(pojas);
                            elemenat0.innerHTML = pojas.pojas;
                        })
                })

            const elemenat5 = document.createElement("td");
            redTabela.appendChild(elemenat5);

            const dugmeIzmeniPolaznika = document.createElement("button");
            dugmeIzmeniPolaznika.innerHTML = "izmeni";
            elemenat5.appendChild(dugmeIzmeniPolaznika);;

            dugmeIzmeniPolaznika.onclick = () => {
                const dugmeIzmeniPolaznikaIme = document.querySelector("#inputIzmeniImePolazika");
                const dugmeIzmeniPolaznikaPrezime = document.querySelector("#inputIzmeniPrezimePolazika");
                const dugmeIzmeniPolaznikaGrupa = document.querySelector("#inputIzmeniGrupuPolazika");
                const dugmeIzmeniPolaznikaJMBG = document.querySelector("#inputIzmeniJMBGPolazika");
                const dugmeIzmeniPolaznikaPojas = document.querySelector("#inputIzmeniPojasPolazika");
                const dugmeIzmeniPolaznikaID = document.querySelector("#inputIzmeniIDPolazika");

                dugmeIzmeniPolaznikaIme.value = this.Ime;
                dugmeIzmeniPolaznikaPrezime.value = this.Prezime;
                dugmeIzmeniPolaznikaGrupa.selectedIndex = this.Grupa - 1;
                dugmeIzmeniPolaznikaJMBG.value = this.JMBG;
                dugmeIzmeniPolaznikaID.value = this.ID;
                if(elemenat0.innerHTML == "beli")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 0;
                if(elemenat0.innerHTML == "žuti")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 1;
                if(elemenat0.innerHTML == "narandzasti")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 2;
                if(elemenat0.innerHTML == "zeleni")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 3;
                if(elemenat0.innerHTML == "plavi")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 4;
                if(elemenat0.innerHTML == "ljubičasti")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 5;
                if(elemenat0.innerHTML == "crveni")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 6;
                if(elemenat0.innerHTML == "braon")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 7;
                if(elemenat0.innerHTML == "crni")
                    dugmeIzmeniPolaznikaPojas.selectedIndex = 8;
            }




        }
    }