using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PurchasesDTO
    {
        public int Id { get; set; }
        public int balance { get; set; }
        public DateTime date { get; set; }
        public int UserId { get; set; }
    }
}
