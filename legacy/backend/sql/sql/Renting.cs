using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sql
{
    internal class Renting
    {
        public int Id { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int Point { get; set; }
        public Purchases Purchases { get; set; }
        public Product Product { get; set; }
    }
}
