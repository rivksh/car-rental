using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks; 
using DAL;
namespace BLL
{
    public interface IPackageRepository
    {
        Packages GetPackages(int id);
        List<Packages> GetAllPackages();
        void AddPackages(Packages package);
        void RemovePackages(Packages package);
        void UpdatePackages(Packages package);
    }
}
