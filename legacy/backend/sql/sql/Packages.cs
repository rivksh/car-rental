using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sql
{
    internal class Packages
    {
        public int Id { get; set; }
        public string Point { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public List<Purchases> PurchasesList { get; set; }



    }
}
