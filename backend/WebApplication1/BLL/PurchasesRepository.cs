using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public class PurchasesRepository : IPurchasesRepository
    {
        private CarRental rental;
        public PurchasesRepository(CarRental rental)
        {
            this.rental = rental;
        }
        public void AddPurchases(Purchases purchases)
        {
            rental.Purchases.Add(purchases);
            rental.SaveChanges();
        }

        public List<Purchases> GetAllPurchases()
        {
            return rental.Purchases.ToList();
        }

        public Purchases GetPurchases(int id)
        {
            Purchases purchases = rental.Purchases.Find(id);
            return purchases;
        }

        public void RemovePurchases(Purchases p)
        {
             rental.Purchases.Remove(p);
             rental.SaveChanges();
            
        }

        public void UpdatePurchases(Purchases purchases)
        {
            rental.Purchases.Update(purchases);
            rental.SaveChanges();
        }

        public async Task UpdateBalanceAsync(int id, int pointToDelete)
        {
            Purchases p = GetPurchases(id);
            if (p == null)
                return;

            p.balance -= pointToDelete;
            if (p.balance < 0) p.balance = 0;
            await rental.SaveChangesAsync();

        }
        //public async Task UpdateBalance(int id, int pointToDelete)
        //{
        //    Purchases p = GetPurchases(id);
        //    if (p == null)
        //        return;

        //    p.balance -= pointToDelete;
        //    if (p.balance < 0) p.balance = 0;

        //    await rental.SaveChangesAsync(); // עכשיו זה תקין
        //}
    


    }
}
