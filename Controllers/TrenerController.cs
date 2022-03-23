using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace WebProjekatKonacni.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrenerController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public TrenerController(KlubContext context) { Context = context; }

        [Route("dodajTreneraBody")]
        [HttpPost]
        public async Task<ActionResult> dodajTreneraBody([FromBody] Trener trener)
        {
            if (string.IsNullOrWhiteSpace(trener.Ime) || trener.Ime.Length > 50)
            {
                return BadRequest("Nije validno ime");
            }
            if (string.IsNullOrWhiteSpace(trener.Prezime) || trener.Prezime.Length > 50)
            {
                return BadRequest("Nije validno prezime");
            }
            if (string.IsNullOrEmpty(trener.SifraTrenera) || trener.SifraTrenera.Length != 6)
                return BadRequest("Pogresan format jedinstvene sifre trenera:netacan broj karaktera");
            string proveraOpstine = trener.SifraTrenera.Substring(0, 2);
            string proveraBroja = trener.SifraTrenera.Substring(2);
            bool PO = Regex.IsMatch(proveraOpstine, @"^[a-zA-Z]+$");
            bool PB = Regex.IsMatch(proveraBroja, @"^\d+$");
            if (!PO || !PB)
                return BadRequest("Pogresan format jedinstvene sifre trenera:karakteri na mestu brojeva ili brojevi na mestu karaktera");

            try
            {
                Context.Treneri.Add(trener);
                await Context.SaveChangesAsync();
                return Ok($"Trener {trener.Ime} {trener.Prezime} sa sifrom {trener.SifraTrenera} je kreiran");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("izmeniTrenera/{sifraTrenera}/{imeTrenera}/{prezimeTrenera}")]
        [HttpPut]
        public async Task<ActionResult> izmeniTrenera(string sifraTrenera, string imeTrenera, string prezimeTrenera)
        {
            string proveraOpstine = sifraTrenera.Substring(0, 2);
            string proveraBroja = sifraTrenera.Substring(2);
            bool PO = Regex.IsMatch(proveraOpstine, @"^[a-zA-Z]+$");
            bool PB = Regex.IsMatch(proveraBroja, @"^\d+$");
            if (!PO || !PB)
                return BadRequest("Pogresan format jedinstvene sifre trenera");



            try
            {
                var trenerZaIzmenu = Context.Treneri.Where(p => p.SifraTrenera == sifraTrenera).FirstOrDefault();

                if (trenerZaIzmenu != null)
                {
                    trenerZaIzmenu.Ime = imeTrenera;
                    trenerZaIzmenu.Prezime = prezimeTrenera;
                    await Context.SaveChangesAsync();
                    return Ok($"Izmenjen je trener sa sifrom {trenerZaIzmenu.SifraTrenera}, sada ima ime {trenerZaIzmenu.Ime} {trenerZaIzmenu.Prezime}");
                }
                else
                {
                    return BadRequest("nema trenera sa datom jedinstvenom sifrom");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [Route("izmeniTreneraBody")]
        [HttpPut]
        public async Task<ActionResult> izmeniTreneraBody([FromBody] Trener trener)
        {
            if (string.IsNullOrEmpty(trener.SifraTrenera) || trener.SifraTrenera.Length != 6)
                return BadRequest("Pogresan format jedinstvene sifre trenera:netacan broj karaktera");
            string proveraOpstine = trener.SifraTrenera.Substring(0, 2);
            string proveraBroja = trener.SifraTrenera.Substring(2);
            bool PO = Regex.IsMatch(proveraOpstine, @"^[a-zA-Z]+$");
            bool PB = Regex.IsMatch(proveraBroja, @"^\d+$");
            if (!PO || !PB)
                return BadRequest("Pogresan format jedinstvene sifre trenera:karakteri na mestu brojeva ili brojevi na mestu karaktera");

            try
            {
                var trenerZaIzmenu = Context.Treneri.Where(p => p.SifraTrenera == trener.SifraTrenera).FirstOrDefault();

                if (trenerZaIzmenu != null)
                {
                    trenerZaIzmenu.Ime = trener.Ime;
                    trenerZaIzmenu.Prezime = trener.Prezime;
                    await Context.SaveChangesAsync();
                    return Ok($"Izmenjen je trener sa sifrom {trenerZaIzmenu.SifraTrenera}, sada ima ime {trenerZaIzmenu.Ime} {trenerZaIzmenu.Prezime}");
                }
                else
                {
                    return BadRequest("nema trenera sa datom jedinstvenom sifrom");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [Route("preuzmiTrenere/{idVestine}")]
        [HttpGet]
        public async Task<ActionResult> preuzmiTrenere(int idVestine)
        {
            var treneri = await Context.Treneri
                .Include(p => p.Vestina)
                .Where(p => p.Vestina.ID == idVestine)
                .ToListAsync();

            return Ok
            (
            treneri.Select(p =>
            new
            {
                ID = p.ID,
                SifraTrenera = p.SifraTrenera,
                Ime = p.Ime,
                Prezime = p.Prezime,
                VestinaNaziv = p.Vestina.Naziv,
                VestinaID = p.Vestina.ID
            }).ToList()

            );
        }

        [Route("obrisiTrenera/{id}")]
        [HttpDelete]
        public async Task<ActionResult> obrisiTrenera(int id)
        {
            var trener = await Context.Treneri.FindAsync(id);

            string ime = trener.Ime;
            string prezime = trener.Prezime;

            if (trener == null)
                return BadRequest("ne postoji trener sa tim ID-jem");
            try
            {
                Context.Treneri.Remove(trener);
                await Context.SaveChangesAsync();
                return Ok($"izbrisan je trener {ime} {prezime}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }



        [Route("dodajTrenera/{ime}/{prezime}/{sifraTrenera}/{VestinaID}")]
        [HttpPost]
        public async Task<ActionResult> dodajTrenera(string ime, string prezime, string sifraTrenera, int VestinaID)
        {
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50)
            {
                return BadRequest("Nije validno ime");
            }
            if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50)
            {
                return BadRequest("Nije validno prezime");
            }
            if (string.IsNullOrEmpty(sifraTrenera) || sifraTrenera.Length != 6)
                return BadRequest("Pogresan format jedinstvene sifre trenera:netacan broj karaktera");
            string proveraOpstine = sifraTrenera.Substring(0, 2);
            string proveraBroja = sifraTrenera.Substring(2);
            bool PO = Regex.IsMatch(proveraOpstine, @"^[a-zA-Z]+$");
            bool PB = Regex.IsMatch(proveraBroja, @"^\d+$");
            if (!PO || !PB)
                return BadRequest("Pogresan format jedinstvene sifre trenera:karakteri na mestu brojeva ili brojevi na mestu karaktera");

            var STP = Context.Treneri.Where(p => p.SifraTrenera == sifraTrenera).FirstOrDefault();
            if (STP != null)
                return BadRequest("trener sa datom sifrom vec postoji");

            var vestina = Context.Vestine.Where(p => p.ID == VestinaID).FirstOrDefault();
            if (vestina == null)
                return BadRequest("Data vestina ne postoji");

            Trener trener1 = new Trener();
            trener1.Ime = ime;
            trener1.Prezime = prezime;
            trener1.SifraTrenera = sifraTrenera;
            trener1.Vestina = vestina;

            try
            {
                Context.Treneri.Add(trener1);
                await Context.SaveChangesAsync();
                return Ok($"Trener {trener1.Ime} {trener1.Prezime} sa sifrom {trener1.SifraTrenera} je kreiran, vestina mu je {trener1.Vestina.Naziv}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("izmeniTrenera/{ime}/{prezime}/{sifraTrenera}/{VestinaID}")]
        [HttpPut]
        public async Task<ActionResult> izmeniTrenera(string ime, string prezime, string sifraTrenera, int VestinaID)
        {
            var trener = Context.Treneri.Where(p => p.SifraTrenera == sifraTrenera).FirstOrDefault();
            var vestina = Context.Vestine.Where(p => p.ID == VestinaID).FirstOrDefault();
            if (trener == null)
                return BadRequest($"Trener sa sifrom {sifraTrenera} ne postoji!");
            if (vestina == null)
                return BadRequest($"vestina ne postoji!");
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50)
            {
                return BadRequest("Nije validno ime");
            }
            if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50)
            {
                return BadRequest("Nije validno prezime");
            }

            trener.Ime = ime;
            trener.Prezime = prezime;
            trener.Vestina = vestina;

            try
            {
                Context.Treneri.Update(trener);
                await Context.SaveChangesAsync();
                return Ok($"Trener se sada zove \"{trener.Ime} {trener.Prezime}\" i ima sifru {trener.SifraTrenera} ");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
