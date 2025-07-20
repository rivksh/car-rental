using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sql
{
    internal class Users
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phon { get; set; }
        public List<Purchases> PurchasesList { get; set; }
    }
}
