using Microsoft.EntityFrameworkCore;
using MusementApi.Configurations;
using MusementApi.Models;

namespace MusementApi.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Tour> Tours => Set<Tour>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new TourConfiguration());
    }
}
