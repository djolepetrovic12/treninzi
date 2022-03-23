using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

namespace WebProjekatKonacni.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PolaznikController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public PolaznikController(KlubContext context) { Context = context; }

        [EnableCors("CORS")]
        [Route("preuzmiPolaznike")]
        [HttpGet]
        public ActionResult preuzmiPolaznike()
        {
            /*var Polaznici = Context.Polaznici
                .Include(p => p.PolaznikSpojevi)
                .ThenInclude(p => p.Vestina)
                .ToList();*/
            return Ok(Context.Polaznici);
        }

        [Route("kreirajPolaznika/{ime}/{prezime}/{grupa}/{jmbg}")]
        [HttpPost]
        public async Task<ActionResult> kreirajPolaznika(string ime, string prezime, int grupa, string jmbg)
        {
            if (string.IsNullOrEmpty(ime) || ime.Length > 50)
                return BadRequest("ime sadrži grešku");
            if (string.IsNullOrEmpty(prezime) || prezime.Length > 50)
                return BadRequest("prezime sadrži grešku");
            //grupu ne moramo da ispitujemo jer smo sa klijentske strane ogranicili na 10 grupe sto je i bila inicijalna zamisao
            bool proveraJMBG = Regex.IsMatch(jmbg, @"^\d+$");
            if (!proveraJMBG || jmbg.Length != 13)
                return BadRequest("molimo vas da samo unosite cifre i da je duzina JMBG-a 13 cifara");

            /*var jmbgP = Context.Polaznici.Where(p=>p.JMBG == jmbg).FirstOrDefault();
            if(jmbgP != null)
                return BadRequest("polaznik sa datim JMBG-om vec postoji");*/


            Polaznik pol = new Polaznik();
            pol.Ime = ime;
            pol.Prezime = prezime;
            pol.Grupa = grupa;
            pol.JMBG = jmbg;

            try
            {
                Context.Polaznici.Add(pol);
                await Context.SaveChangesAsync();
                return Ok(pol);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("izmeniPolaznika/{id}/{ime}/{prezime}/{grupa}/{jmbg}")]
        [HttpPut]
        public async Task<ActionResult> izmeniPolaznika(int id, string ime, string prezime, int grupa, string jmbg)
        {
            if (string.IsNullOrEmpty(ime) || ime.Length > 50)
                return BadRequest("ime sadrži grešku");
            if (string.IsNullOrEmpty(prezime) || prezime.Length > 50)
                return BadRequest("prezime sadrži grešku");
            //grupu ne moramo da ispitujemo jer smo sa klijentske strane ogranicili na 10 grupe sto je i bila inicijalna zamisao
            bool proveraJMBG = Regex.IsMatch(jmbg, @"^\d+$");
            if (!proveraJMBG || jmbg.Length != 13)
                return BadRequest("molimo vas da samo unosite cifre i da je duzina JMBG-a 13 cifara");
            Polaznik pol = Context.Polaznici.Where(p => p.ID == id).FirstOrDefault();
            if (pol == null)
                return BadRequest("dati polaznik ne postoji");
            pol.Ime = ime;
            pol.Prezime = prezime;
            pol.Grupa = grupa;
            pol.JMBG = jmbg;

            try
            {
                Context.Polaznici.Update(pol);
                await Context.SaveChangesAsync();
                return Ok(pol);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



    }
}
