using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class PackageRepository : IPackageRepository
    {
        private CarRental rental;
        public PackageRepository(CarRental rental)
        {
            this.rental = rental;
        }

        public void AddPackages(Packages package)
        {
            rental.Packages.Add(package);
            rental.SaveChanges();
        }

        public List<Packages> GetAllPackages()
        {
            return rental.Packages.ToList();
        }

        public Packages GetPackages(int id)
        {
            Packages package = rental.Packages.Find(id);
            return package;
        }

        public void RemovePackages(Packages package)
        {
            rental.Packages.Remove(package);
            rental.SaveChanges();
        }

        public void UpdatePackages(Packages package)
        {
            rental.Packages.Update(package);
            rental.SaveChanges();
        }

        
    }
}
