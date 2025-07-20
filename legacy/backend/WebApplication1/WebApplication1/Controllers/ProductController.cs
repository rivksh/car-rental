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
    public class ProductController : Controller
    {
        private IProductRepository productRepository;
        public ProductController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        //----------HttpGet---------------
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Product p = productRepository.GetProduct(id);
            if (p == null)
                return NotFound("Product not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<Product> pl = productRepository.GetAllProduct();
            if (pl == null)
                return NotFound("Product not found");
            return Ok(pl);
        }
        //-------HttpPost-------------
        [HttpPost("addProduct/")]
        public ActionResult<Product> AddProduct(Product p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Product p1 = productRepository.GetProduct(p.Id);
            if (p1 != null)
                return Conflict();
            productRepository.AddProduct(p);

            return CreatedAtAction(nameof(AddProduct), new { id = p.Id }, p);
        }
        //-----------------HttpPut--------------------------
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, Product p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
            productRepository.UpdateProduct(p);
            return Ok(p);
        }
        //-----------HttpDelete--------------------
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            Product p = productRepository.GetProduct(id);
            if (p == null)
                return NotFound("no Product for delete");
            productRepository.RemoveProduct(p);
            return NoContent();
        }

    }
}


    
    
        

        
        


    

