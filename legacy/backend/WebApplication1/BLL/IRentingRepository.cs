using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public interface IRentingRepository
    {
        Renting GetRenting(int id);
        List<Renting> GetAllRenting();
        void AddRenting(Renting renting);
        void RemoveRenting(Renting renting);
        void UpdateRenting(Renting renting);
    
        

    }
}
