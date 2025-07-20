using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;
using DTO;
namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class PackageController : ControllerBase
    {
        private IPackageRepository packageRepository;

        public PackageController(IPackageRepository packageRepository)
        {
            this.packageRepository = packageRepository;
        }
        //----------HttpGet---------------
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Packages p = packageRepository.GetPackages(id);
            if (p == null)
                return NotFound("Packages not found");
            return Ok(p);
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<Packages> pl = packageRepository.GetAllPackages();
            if (pl == null)
                return NotFound("Packages not found");
            return Ok(pl);
        }
        //-------HttpPost-------------
        [HttpPost("addPackage/")]
        public ActionResult<Packages> AddPackage(Packages p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Packages p1 = packageRepository.GetPackages(p.Id);
            if (p1 != null)
                return Conflict();
            packageRepository.AddPackages(p);

            return CreatedAtAction(nameof(AddPackage), new { id = p.Id }, p);
        }
        //-----------------HttpPut--------------------------
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, Packages p)
        {
            if (p == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != p.Id)
            {
                return Conflict();
            }
            packageRepository.UpdatePackages(p);
            return Ok(p);
        }
        //-----------HttpDelete--------------------
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            Packages p = packageRepository.GetPackages(id);
            if (p == null)
                return NotFound("no Packages for delete");
            packageRepository.RemovePackages(p);
            return NoContent();
        }


    }
}
