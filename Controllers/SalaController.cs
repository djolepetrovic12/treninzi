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
    public class SalaController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public SalaController(KlubContext context) { Context = context; }

        [Route("preuzmiSale")]
        [HttpGet]
        public ActionResult preuzmiSale()
        {
            return Ok(Context.Sale);
        }

        [Route("dodajSalu/{adresa}/{imeLokacije}")]
        [HttpPost]
        public async Task<ActionResult> dodajSalu(string adresa, string imeLokacije)
        {
            if (string.IsNullOrWhiteSpace(adresa) || adresa.Length > 100)
            {
                return BadRequest("Nije validna adresa");
            }

            if (string.IsNullOrWhiteSpace(imeLokacije) || imeLokacije.Length > 50)
            {
                return BadRequest("Nije validno ime lokacije");
            }

            Sala salica = new Sala();
            salica.Adresa = adresa;
            salica.ImeLokacije = imeLokacije;

            try
            {
                Context.Sale.Add(salica);
                await Context.SaveChangesAsync();
                return Ok($"Dodata je sala \"{salica.ImeLokacije}\" koja se nalazi na adresi {salica.Adresa}.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("izmeniSalu/{id}/{adresa}/{imeLokacije}")]
        [HttpPut]
        public async Task<ActionResult> izmeniSalu(int id, string adresa, string imeLokacije)
        {
            if (string.IsNullOrWhiteSpace(adresa) || adresa.Length > 100)
            {
                return BadRequest("Nije validna adresa");
            }

            if (string.IsNullOrWhiteSpace(imeLokacije) || imeLokacije.Length > 50)
            {
                return BadRequest("Nije validno ime lokacije");
            }
            var sala = await Context.Sale.FindAsync(id);
            if (sala == null)
                return BadRequest("data sala ne postoji");
            sala.Adresa = adresa;
            sala.ImeLokacije = imeLokacije;

            try
            {
                Context.Sale.Update(sala);
                await Context.SaveChangesAsync();
                return Ok($"Sala sada ima adresu{sala.Adresa} i zove se {sala.ImeLokacije}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("obrisiSalu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> obrisiSalu(int id)
        {
            var sala = await Context.Sale.FindAsync(id);
            if (sala == null)
                return BadRequest("data sala ne postoji");
            try
            {
                Context.Sale.Remove(sala);
                await Context.SaveChangesAsync();
                return Ok($"Sala je izbrisana");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
