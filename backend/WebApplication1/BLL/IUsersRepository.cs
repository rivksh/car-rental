using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BLL
{
    public interface IUsersRepository
    {
        Users GetUsers(int id);
        Users GetUsersByIdAndPassword(UsersDTO userDto);
        List<Users> GetAllUsers();
        void AddUsers(Users users);
        void RemoveUsers(Users users);
        void UpdateUsers(Users users);


    }
}
