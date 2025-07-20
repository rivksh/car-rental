
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
    public class PurchasesController : Controller
    {
        private IPurchasesRepository purchasesRepository;

        public PurchasesController(IPurchasesRepository purchasesRepository)
        {
            this.purchasesRepository = purchasesRepository;
        }
        //----------HttpGet---------------
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Purchases p = purchasesRepository.GetPurchases(id);
            if (p == null)
                return NotFound("Purchases not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<Purchases> pl = purchasesRepository.GetAllPurchases();
            if (pl == null)
                return NotFound("Purchases not found");
            return Ok(pl);
        }

        //-------HttpPost-------------
        [HttpPost("addPurchases")]
        public ActionResult<Purchases> AddPurchases(Purchases p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Purchases p1 = purchasesRepository.GetPurchases(p.Id);
            //if (p1 != null)
            //    return Conflict();
            purchasesRepository.AddPurchases(p);

            return CreatedAtAction(nameof(AddPurchases), new { id = p.Id }, p);
        }
        //-----------------HttpPut--------------------------
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, Purchases p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
            purchasesRepository.UpdatePurchases(p);
            return Ok(p);
        }
        //-----------HttpDelete--------------------
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            Purchases p = purchasesRepository.GetPurchases(id);
            if (p == null)
                return NotFound("no Purchases for delete");
            purchasesRepository.RemovePurchases(p);
            return NoContent();
        }
        //[HttpPut("updateBalance/{id}")]
        //public IActionResult UpdateBalance(int purchaseId, int points)
        //{
        //    var purchase = purchasesRepository.GetPurchases(purchaseId);
        //    if (purchase == null)
        //        return NotFound();

        //    purchasesRepository.UpdateBalance(purchaseId,points);
        //    return Ok();
        //}
        [HttpPut("updateBalance")]
        public IActionResult UpdateBalance([FromBody] UpdateBalanceDto dto)
        {
            var purchase = purchasesRepository.GetPurchases(dto.PurchaseId);
            if (purchase == null)
                return NotFound();

            purchasesRepository.UpdateBalanceAsync(dto.PurchaseId, dto.Points);
            return Ok();
        }

        public class UpdateBalanceDto
        {
            public int PurchaseId { get; set; }
            public int Points { get; set; }
        }
    }
}
