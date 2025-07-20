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
    public class Packages
    {
        [Key]
        public int Id { get; set; }
        public int Point { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchases>? PurchasesList { get; set; }


    }
}
