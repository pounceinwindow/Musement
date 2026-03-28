namespace MusementApi.Models;

public sealed class Tour
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string HeroUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int ReviewsCount { get; set; }
    public decimal PriceFrom { get; set; }
    public string Duration { get; set; } = string.Empty;
    public string Languages { get; set; } = string.Empty;
    public bool FreeCancellation { get; set; }
    public string[] Chips { get; set; } = [];
    public string[] Love { get; set; } = [];
    public string DescriptionHtml { get; set; } = string.Empty;
    public string[] Included { get; set; } = [];
    public string[] Remember { get; set; } = [];
    public string Meeting { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string CancelPolicy { get; set; } = string.Empty;
}
