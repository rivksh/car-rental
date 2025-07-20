using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sql
{
    internal class Purchases
    {
        public int Id { get; set; }
        public int balance { get; set; }
        public DateTime  date{ get; set; }
        public Users User { get; set; }
        public Purchases Purchase { get; set; }
    }
}
