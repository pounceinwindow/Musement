namespace MusementApi.Data;

internal sealed record TourSeed(
    int Id,
    string Slug,
    string Title,
    string Description,
    string HeroUrl,
    string Category,
    double Rating,
    int ReviewsCount,
    decimal PriceFrom,
    string Duration,
    string Languages,
    bool FreeCancellation,
    string[] Chips,
    string[] Love,
    string DescriptionHtml,
    string[] Included,
    string RememberFirst,
    string RememberSecond,
    string Meeting,
    string Address,
    string CancelPolicy);
