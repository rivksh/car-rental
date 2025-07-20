using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class Renting
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int Point { get; set; }
        public int ProductId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Product? Product { get; set; }
        public int UsersId { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Users? Users { get; set; }

    }
}
