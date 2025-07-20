using Microsoft.EntityFrameworkCore;
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
    [Index(nameof(IdentityNamber), IsUnique = true)]
    public class Users
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdentityNamber { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phon { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchases>? PurchasesList { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Renting>? RentingList { get; set; }

    }
}
