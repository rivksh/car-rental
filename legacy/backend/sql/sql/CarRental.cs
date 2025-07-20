using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace sql
{
    internal class CarRental : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString: @"Data Source = localhost; Integrated Security = True")
        }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchases> Purchases { get; set; }
        public DbSet<Random> Randoms { get; set; }
        public DbSet<Users> Users { get; set; } 
    }
}
