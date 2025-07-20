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
    public class Purchases
    {
        [Key]
        public int Id { get; set; }
        public int balance { get; set; }
        public DateTime date { get; set; }
        public int UserId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Users? User { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchases>? PurchaseList { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Renting>? RentingList { get; set; }

    }
}
