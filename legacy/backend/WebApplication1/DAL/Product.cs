using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.Runtime.Serialization;

namespace DAL
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int PointForHour { get; set; }
        public int PointForHalfDay { get; set; }
        public int PointForDay { get; set; }
        public int PointForWeek { get; set; }
        public int PointForMounth { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Renting>? RentingsList { get; set; }

    }
}
