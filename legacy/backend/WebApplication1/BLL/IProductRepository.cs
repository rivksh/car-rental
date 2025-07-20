using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public interface IProductRepository
    {
        Product GetProduct(int id);
        List<Product> GetAllProduct();
        void AddProduct(Product product);
        void RemoveProduct(Product product);
        void UpdateProduct(Product product);

    }
}
