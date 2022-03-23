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
    public class TreningController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public TreningController(KlubContext context) { Context = context; }



        [Route("kreirajTrening/{terminDatum}/{terminVreme}/{tum}/{grupa}/{idSale}/{idVestine}")]
        [HttpPost]
        public async Task<ActionResult> kreirajTrening(string terminDatum, string terminVreme, int tum, int grupa, int idSale, int idVestine)
        {
            string[] godinaMesecDan = terminDatum.Split('-');
            string[] satiMinuti = terminVreme.Split(':');
            DateTime datumVreme = new DateTime(Convert.ToInt32(godinaMesecDan[0]), Convert.ToInt32(godinaMesecDan[1]), Convert.ToInt32(godinaMesecDan[2]), Convert.ToInt32(satiMinuti[0]), Convert.ToInt32(satiMinuti[1]), 0);
            Trening trening = new Trening();
            trening.Termin = datumVreme;
            trening.Grupa = grupa;
            trening.TrajanjeUMinutima = tum;

            var sala = Context.Sale.Where(p => p.ID == idSale).FirstOrDefault();
            if (sala == null)
                return BadRequest("sala ne postoji");
            var vestina = Context.Vestine.Where(p => p.ID == idVestine).FirstOrDefault();
            if (vestina == null)
                return BadRequest("vetina ne postoji");

            trening.Sala = sala;
            trening.Vestina = vestina;

            try
            {
                Context.Treninzi.Add(trening);
                await Context.SaveChangesAsync();
                return Ok("trening je napravljen");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("preuzmiTrening/{idVestine}")]
        [HttpGet]
        public ActionResult preuzmiTrening(int idVestine)
        {
            var treninzi = Context.Treninzi
            .Include(p => p.Vestina)
            .Include(p => p.Sala)
            .Where(p => p.Vestina.ID == idVestine).ToList();

            return Ok(treninzi.Select(p =>
                new
                {
                    ID = p.ID,
                    TerminDatum = $"{p.Termin.Year}/{p.Termin.Month}/{p.Termin.Day}",
                    TerminVreme = $"{p.Termin.Hour}:{p.Termin.Minute}",
                    TrajanjeUMinutima = p.TrajanjeUMinutima,
                    Grupa = p.Grupa,
                    VestinaNaziv = p.Vestina.Naziv,
                    SalaNaziv = p.Sala.Adresa

                }).ToList());
        }


        [Route("izbrisiTrening/{id}")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiTrening(int id)
        {
            Trening trening = Context.Treninzi.Where(p => p.ID == id).FirstOrDefault();
            if (trening == null)
                return BadRequest("dati trening ne postoji");
            try
            {
                Context.Treninzi.Remove(trening);
                await Context.SaveChangesAsync();
                return Ok("trening je izbrisana");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("izmeniTrening/{id}/{terminDatum}/{terminVreme}/{tum}/{grupa}/{idSale}")]
        [HttpPut]
        public async Task<ActionResult> izmeniTrening(int id, string terminDatum, string terminVreme, int tum, int grupa, int idSale)
        {


            string[] godinaMesecDan = terminDatum.Split('-');
            string[] satiMinuti = terminVreme.Split(':');
            DateTime datumVreme = new DateTime(Convert.ToInt32(godinaMesecDan[0]), Convert.ToInt32(godinaMesecDan[1]), Convert.ToInt32(godinaMesecDan[2]), Convert.ToInt32(satiMinuti[0]), Convert.ToInt32(satiMinuti[1]), 0);
            Trening trening = Context.Treninzi.Where(p => p.ID == id).FirstOrDefault();
            trening.Termin = datumVreme;
            trening.Grupa = grupa;
            trening.TrajanjeUMinutima = tum;

            var sala = Context.Sale.Where(p => p.ID == idSale).FirstOrDefault();
            if (sala == null)
                return BadRequest("sala ne postoji");

            trening.Sala = sala;
            try
            {
                Context.Treninzi.Update(trening);
                await Context.SaveChangesAsync();
                return Ok("trening je izmenjen");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }



    }
}
