using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ProductRepository: IProductRepository
    {
        private CarRental rental;
        public ProductRepository(CarRental rental)
        {
            this.rental = rental;
        }
        

        public void AddProduct(Product product)
        {
            rental.Products.Add(product);
            rental.SaveChanges();
        }

        public List<Product> GetAllProduct()
        {
           return rental.Products.ToList();
        }

        public Product GetProduct(int id)
        {
            Product product = rental.Products.Find(id);
            return product;
        }

        
        public void RemoveProduct(Product p)
        {
            rental.Products.Remove(p);
            rental.SaveChanges();
        }

        public void UpdateProduct(Product product)
        {
            rental.Products.Update(product);
            rental.SaveChanges();
        }
    }
}
