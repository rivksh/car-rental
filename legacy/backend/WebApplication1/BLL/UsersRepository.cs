using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
    
namespace BLL
{
    public class UsersRepository : IUsersRepository
    {
        private CarRental rental;
        public UsersRepository(CarRental rental)
        {
            this.rental = rental;
        }
        public void AddUsers(Users users)
        {
            rental.Users.Add(users);
            rental.SaveChanges();
        }

        public List<Users> GetAllUsers()
        {
            return rental.Users.ToList();
        }

        public Users GetUsers(int IdentityNamber)
        {
            Users user = rental.Users.Where(x=>x.IdentityNamber== IdentityNamber).FirstOrDefault();
            return user;
        }

        public Users GetUsersByIdAndPassword(UsersDTO userDto)
        {
            Users user = rental.Users.Where(x => x.IdentityNamber == userDto.IdentityNamber && x.Password.Equals(userDto.Password)).FirstOrDefault();
            return user;
        }

        public void RemoveUsers(Users u)
        {
            rental.Users.Remove(u);
            rental.SaveChanges();
        }

        public void UpdateUsers(Users users)
        {
            rental.Users.Update(users);
            rental.SaveChanges();
        }
    }
}
