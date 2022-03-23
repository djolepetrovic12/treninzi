using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using System.Text.RegularExpressions;

namespace WebProjekatKonacni.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VesPolSpojController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public VesPolSpojController(KlubContext context) { Context = context; }

        [Route("preuzmiPojaseve")]
        [HttpGet]
        public ActionResult preuzmiPojaseve()
        {
            return Ok(Context.VesPolSpojevi);
        }

        [Route("preuzmiPojasPoID/{id}")]
        [HttpGet]
        public ActionResult preuzmiPojasPoID(int id)
        {
            var pojas = Context.VesPolSpojevi.Where(p => p.Polaznik.ID == id).FirstOrDefault();
            if (pojas == null)
                return BadRequest("ne postoji dati pojas za tog studenta");

            return Ok(pojas);

        }

        [Route("dodajPojas/{Naziv}/{PolaznikID}/{VestinaID}")]
        [HttpPost]
        public async Task<ActionResult> dodajPojas(string Naziv, int PolaznikID, int VestinaID)
        {
            if (string.IsNullOrWhiteSpace(Naziv))
            {
                return BadRequest("naziv pojasa nije u ispravnom formatu");
            }
            var polaznik = Context.Polaznici.Where(p => p.ID == PolaznikID).FirstOrDefault();
            var vestina = Context.Vestine.Where(p => p.ID == VestinaID).FirstOrDefault();
            if (polaznik == null)
            {
                return BadRequest("Greska: dati polaznik ne postoji");
            }
            if (vestina == null)
            {
                return BadRequest("Greska: data vestina ne postoji");
            }
            VesPolSpoj pojas1 = new VesPolSpoj();
            pojas1.Pojas = Naziv;
            pojas1.Vestina = vestina;
            pojas1.Polaznik = polaznik;
            try
            {
                Context.VesPolSpojevi.Add(pojas1);
                polaznik.PolaznikSpojevi.Add(pojas1);
                await Context.SaveChangesAsync();
                return Ok($"Dodat je pojas za polaznika {polaznik.Ime} {polaznik.Prezime} za veštinu {vestina.Naziv}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("izmeniPojas/{Naziv}/{PolaznikID}")]
        [HttpPut]
        public async Task<ActionResult> izmeniPojas(string Naziv, int PolaznikID)
        {
            VesPolSpoj pojas = Context.VesPolSpojevi.Where(p => p.Polaznik.ID == PolaznikID).FirstOrDefault();
            if (pojas == null)
                return BadRequest("dati pojas ne postoji");
            pojas.Pojas = Naziv;

            try
            {
                Context.VesPolSpojevi.Update(pojas);
                await Context.SaveChangesAsync();
                return Ok(pojas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
    }
}
