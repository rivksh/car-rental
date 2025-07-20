using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class RentingController : Controller
    {
        private IRentingRepository rentingRepository;

        public RentingController(IRentingRepository rentingRepository)
        {
            this.rentingRepository = rentingRepository;
        }
        //----------HttpGet---------------
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Renting r = rentingRepository.GetRenting(id);
            if (r == null)
                return NotFound("Renting not found");
            return Ok(r);
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<Renting> rl = rentingRepository.GetAllRenting();
            if (rl == null)
                return NotFound("Renting not found");
            return Ok(rl);
        }
            
        
        //-------HttpPost-------------
        [HttpPost("addRenting")]
        public ActionResult<Renting> AddRenting(Renting r)
        {
        //    if (r == null || !ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
            Renting r1 = rentingRepository.GetRenting(r.Id);
            if (r1 != null)
                return Conflict();
            rentingRepository.AddRenting(r);
            return CreatedAtAction(nameof(AddRenting), new { id = r.Id }, r);
        }
        //-----------------HttpPut--------------------------
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, Renting r)
        {
            if (r == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != r.Id)
            {
                return Conflict();
            }
            rentingRepository.UpdateRenting(r);
            return Ok(r);
        }
        //-----------HttpDelete--------------------
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            Renting r = rentingRepository.GetRenting(id);
            if (r == null)
                return NotFound("no Renting for delete");
            rentingRepository.RemoveRenting(r);
            return NoContent();
        }
    }
}
