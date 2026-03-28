using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MusementApi.Models;

namespace MusementApi.Configurations;

public sealed class TourConfiguration : IEntityTypeConfiguration<Tour>
{
    private static readonly ValueConverter<string[], string> StringArrayConverter = new(
        value => JsonSerializer.Serialize(value ?? Array.Empty<string>(), (JsonSerializerOptions?)null),
        value => string.IsNullOrWhiteSpace(value)
            ? Array.Empty<string>()
            : JsonSerializer.Deserialize<string[]>(value, (JsonSerializerOptions?)null) ?? Array.Empty<string>());

    private static readonly ValueComparer<string[]> StringArrayComparer = new(
        (left, right) => (left ?? Array.Empty<string>()).SequenceEqual(right ?? Array.Empty<string>()),
        value => value == null
            ? 0
            : value.Aggregate(0, (hash, item) => HashCode.Combine(hash, item ?? string.Empty)),
        value => value == null ? Array.Empty<string>() : value.ToArray());

    public void Configure(EntityTypeBuilder<Tour> builder)
    {
        builder.ToTable("Tours");

        builder.HasKey(tour => tour.Id);

        builder.Property(tour => tour.Id)
            .ValueGeneratedOnAdd();

        builder.Property(tour => tour.Slug)
            .HasMaxLength(256)
            .IsRequired();

        builder.HasIndex(tour => tour.Slug)
            .IsUnique();

        builder.Property(tour => tour.Title)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(tour => tour.Description)
            .HasMaxLength(2000)
            .IsRequired();

        builder.Property(tour => tour.HeroUrl)
            .HasMaxLength(512)
            .IsRequired();

        builder.Property(tour => tour.Category)
            .HasMaxLength(128)
            .IsRequired();

        builder.Property(tour => tour.PriceFrom)
            .HasColumnType("decimal(18,2)");

        builder.Property(tour => tour.Duration)
            .HasMaxLength(128)
            .IsRequired();

        builder.Property(tour => tour.Languages)
            .HasMaxLength(256)
            .IsRequired();

        builder.Property(tour => tour.DescriptionHtml)
            .HasColumnType("nvarchar(max)");

        builder.Property(tour => tour.Meeting)
            .HasMaxLength(512)
            .IsRequired();

        builder.Property(tour => tour.Address)
            .HasMaxLength(512)
            .IsRequired();

        builder.Property(tour => tour.CancelPolicy)
            .HasMaxLength(1000)
            .IsRequired();

        ConfigureStringArray(builder.Property(tour => tour.Chips));
        ConfigureStringArray(builder.Property(tour => tour.Love));
        ConfigureStringArray(builder.Property(tour => tour.Included));
        ConfigureStringArray(builder.Property(tour => tour.Remember));
    }

    private static void ConfigureStringArray(PropertyBuilder<string[]> propertyBuilder)
    {
        propertyBuilder
            .HasColumnType("nvarchar(max)")
            .HasConversion(StringArrayConverter);

        propertyBuilder.Metadata.SetValueComparer(StringArrayComparer);
    }
}
