using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int PointForHour { get; set; }
        public int PointForHalfDay { get; set; }
        public int PointForfDay { get; set; }
        public int PointForWeek { get; set; }
        public int PointForMounth { get; set; }
    }
}
