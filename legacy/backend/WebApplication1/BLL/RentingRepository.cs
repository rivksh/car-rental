using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class RentingRepository : IRentingRepository
    {
        private CarRental rental;
        public RentingRepository(CarRental rental)
        {
            this.rental = rental;
        }
        public void AddRenting(Renting renting)
        {
            rental.Rentings.Add(renting);
            rental.SaveChanges();
        }

        public List<Renting> GetAllRenting()
        {
            return rental.Rentings.ToList();
        }

        public Renting GetRenting(int id)
        {
            Renting renting = rental.Rentings.Find(id);
            return renting;
        }

        public void RemoveRenting(Renting r)
        {
            rental.Rentings.Remove(r);
            rental.SaveChanges();
        }

        public void UpdateRenting(Renting renting)
        {
            rental.Rentings.Update(renting);
            rental.SaveChanges();
        }
    }
}
