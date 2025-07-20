using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Cors;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UsersController : Controller
    {
        private IUsersRepository usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            this.usersRepository = usersRepository;
        }
        //----------HttpGet---------------
        [HttpGet("getById/{id}")]
        public IActionResult GetById(int id)
        {
            Users u = usersRepository.GetUsers(id);
            if (u == null)
                return NotFound("Users not found");
            return Ok(u);
        }
        [HttpGet("getAll")]
        public IActionResult getAll()
        {
            List<Users> ul = usersRepository.GetAllUsers();
            if (ul == null)
                return NotFound("Users not found");
            return Ok(ul);
        }
        [HttpPost("getByIdAndPassword")]
        public IActionResult GetByIdandPassword(UsersDTO userDto)
        {
            Users u = usersRepository.GetUsersByIdAndPassword(userDto);
            if (u == null)
                return NotFound("Users not found");
            return Ok(u);
        }
        //-------HttpPost-------------
        [HttpPost("addUsers")]
        public ActionResult<Users> AddUsers(Users u)
        {
            //if (u == null || !ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            Users u1 = usersRepository.GetUsers(u.IdentityNamber);
            if (u1 != null)
                return Conflict();
            usersRepository.AddUsers(u);
            return CreatedAtAction(nameof(AddUsers), new { IdentityNamber = u.IdentityNamber }, u);
        }
        //-----------------HttpPut--------------------------
        [HttpPut("update/{id}")]
        public IActionResult Update(int id, Users u)
        {
            if (u == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != u.Id)
            {
                return Conflict();
            }
            usersRepository.UpdateUsers(u);
            return Ok(u);
        }
        //-----------HttpDelete--------------------
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            Users u = usersRepository.GetUsers(id);
            if (u == null)
                return NotFound("no Users for delete");
            usersRepository.RemoveUsers(u);
            return NoContent();
        }
    }
}
