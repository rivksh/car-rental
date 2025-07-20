using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class CarRental : DbContext
    {
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //   optionsBuilder.UseSqlServer(connectionString: @"Data Source=localhost;Initial Catalog=CarRental;Integrated Security=True");
        //}
        public CarRental (DbContextOptions<CarRental> options) : base(options)
        {

        }
        public DbSet<Packages> Packages { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchases> Purchases { get; set; }
        public DbSet<Renting> Rentings { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
