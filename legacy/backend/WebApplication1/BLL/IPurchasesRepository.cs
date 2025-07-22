using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public interface IPurchasesRepository
    {
        Purchases GetPurchases(int id);
        List<Purchases> GetAllPurchases();
        void AddPurchases(Purchases purchases);
        void RemovePurchases(Purchases purchases);
        void UpdatePurchases(Purchases purchases);
        Task UpdateBalanceAsync(int id, int point);
    }
}