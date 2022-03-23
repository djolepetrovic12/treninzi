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
    public class VestinaController : ControllerBase
    {
        public KlubContext Context { get; set; }

        public VestinaController(KlubContext context) { Context = context; }

        [Route("preuzmiVestine")]
        [HttpGet]
        public ActionResult preuzmiVestine()
        {
            return Ok(Context.Vestine);
        }


    }


}
