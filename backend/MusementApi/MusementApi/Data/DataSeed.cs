using System.Globalization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using MusementApi.Models;

namespace MusementApi.Data;

public static class DataSeed
{
    private static readonly string[] CategoryTabs =
    [
        "Attractions & guided tours",
        "Excursions & day trips",
        "Activities",
        "Experiences for locals",
        "Tickets & events"
    ];

    private static readonly FilterOptionSeed[] TicketOptions =
    [
        new("instant", "Instant confirmation"),
        new("guided", "Guided tour"),
        new("skip", "Skip the line"),
        new("fees", "Entrance fees included"),
        new("privateTour", "Private Tour"),
        new("meal", "Meal Included")
    ];

    private static readonly FilterConfig[] FilterConfigs =
    [
        FilterConfig.Choice(
            "category",
            "Categories",
            "tabs",
            false,
            CategoryTabs.Select(category => new FilterOptionSeed(category, category)).ToArray(),
            static (tour, option) => string.Equals(tour.Category, option, StringComparison.OrdinalIgnoreCase)),
        FilterConfig.Range(
            "price",
            "Price",
            "currency",
            "minPrice",
            "maxPrice",
            static tour => tour.PriceFrom,
            1m),
        FilterConfig.Range(
            "rating",
            "Rating",
            "rating",
            "minRating",
            "maxRating",
            static tour => Math.Round((decimal)tour.Rating, 1),
            0.1m),
        FilterConfig.Choice(
            "tickets",
            "Tickets option",
            "checkboxes",
            true,
            TicketOptions,
            MatchesTicketOption),
        FilterConfig.Toggle(
            "freeCancellation",
            "Free cancellation",
            static tour => tour.FreeCancellation)
    ];

    public static async Task InitializeAsync(AppDbContext dbContext, CancellationToken cancellationToken = default)
    {
        if (await dbContext.Tours.AnyAsync(cancellationToken))
        {
            return;
        }

        var tours = ToursData.Items
            .Select(MapSeedToEntity)
            .ToArray();

        await dbContext.Tours.AddRangeAsync(tours, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public static async Task<object> GetToursAsync(
        IQueryable<Tour> source,
        IQueryCollection query,
        CancellationToken cancellationToken = default)
    {
        var tours = await source
            .AsNoTracking()
            .OrderBy(tour => tour.Id)
            .ToListAsync(cancellationToken);

        var filterState = ParseFilters(query);
        var filteredTours = ApplyFilters(tours, filterState).ToArray();

        return new
        {
            Categories = CategoryTabs,
            MinPrice = tours.Count == 0 ? 0m : tours.Min(x => x.PriceFrom),
            MaxPrice = tours.Count == 0 ? 0m : tours.Max(x => x.PriceFrom),
            TotalCount = filteredTours.Length,
            Applied = BuildAppliedFilters(filterState),
            Filters = BuildFilterPayload(filterState, filteredTours.Length, tours),
            Tours = filteredTours.Select(ToTourResponse).ToArray()
        };
    }

    public static async Task<object> GetFiltersAsync(
        IQueryable<Tour> source,
        IQueryCollection query,
        CancellationToken cancellationToken = default)
    {
        var tours = await source
            .AsNoTracking()
            .OrderBy(tour => tour.Id)
            .ToListAsync(cancellationToken);

        var filterState = ParseFilters(query);
        var filteredTours = ApplyFilters(tours, filterState).ToArray();

        return BuildFilterPayload(filterState, filteredTours.Length, tours);
    }

    public static async Task<object?> GetTourByIdAsync(
        IQueryable<Tour> source,
        int id,
        CancellationToken cancellationToken = default)
    {
        var tour = await source
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        return tour is null ? null : ToTourResponse(tour);
    }

    public static object ToTourResponse(Tour tour)
    {
        return new
        {
            tour.Id,
            tour.Slug,
            tour.Title,
            tour.Description,
            tour.HeroUrl,
            tour.Category,
            tour.Rating,
            tour.ReviewsCount,
            tour.PriceFrom,
            tour.Duration,
            tour.Languages,
            tour.Love,
            tour.DescriptionHtml,
            Price = $"${tour.PriceFrom:F2}",
            tour.FreeCancellation,
            tour.Chips,
            tour.Included,
            Remember = tour.Remember,
            tour.Meeting,
            tour.Address,
            tour.CancelPolicy,
            Reviews = Array.Empty<object>()
        };
    }

    public static void NormalizeTour(Tour tour)
    {
        tour.Slug = NormalizeText(tour.Slug);
        tour.Title = NormalizeText(tour.Title);
        tour.Description = NormalizeText(tour.Description);
        tour.HeroUrl = NormalizeText(tour.HeroUrl);
        tour.Category = NormalizeText(tour.Category);
        tour.Duration = NormalizeText(tour.Duration);
        tour.Languages = NormalizeText(tour.Languages);
        tour.DescriptionHtml = NormalizeText(tour.DescriptionHtml);
        tour.Meeting = NormalizeText(tour.Meeting);
        tour.Address = NormalizeText(tour.Address);
        tour.CancelPolicy = NormalizeText(tour.CancelPolicy);
        tour.Chips = NormalizeItems(tour.Chips);
        tour.Love = NormalizeItems(tour.Love);
        tour.Included = NormalizeItems(tour.Included);
        tour.Remember = NormalizeItems(tour.Remember);
    }

    public static void ApplyTourValues(Tour target, Tour source)
    {
        NormalizeTour(source);

        target.Slug = source.Slug;
        target.Title = source.Title;
        target.Description = source.Description;
        target.HeroUrl = source.HeroUrl;
        target.Category = source.Category;
        target.Rating = source.Rating;
        target.ReviewsCount = source.ReviewsCount;
        target.PriceFrom = source.PriceFrom;
        target.Duration = source.Duration;
        target.Languages = source.Languages;
        target.FreeCancellation = source.FreeCancellation;
        target.Chips = CloneItems(source.Chips);
        target.Love = CloneItems(source.Love);
        target.DescriptionHtml = source.DescriptionHtml;
        target.Included = CloneItems(source.Included);
        target.Remember = CloneItems(source.Remember);
        target.Meeting = source.Meeting;
        target.Address = source.Address;
        target.CancelPolicy = source.CancelPolicy;
    }

    private static object BuildFilterPayload(FilterState filterState, int totalCount, IReadOnlyCollection<Tour> tours)
    {
        var items = FilterConfigs.Select(filter => BuildFilter(filter, filterState, tours)).ToArray();

        return new
        {
            TotalCount = totalCount,
            Applied = BuildAppliedFilters(filterState),
            Items = items,
            Tabs = items.FirstOrDefault(item => string.Equals(item.Type, "tabs", StringComparison.OrdinalIgnoreCase))?.Items
                   ?? Array.Empty<FilterOptionState>(),
            Price = items.FirstOrDefault(item => string.Equals(item.Key, "price", StringComparison.OrdinalIgnoreCase)),
            Checkboxes = items.Where(item => string.Equals(item.Type, "checkboxes", StringComparison.OrdinalIgnoreCase)).ToArray(),
            Toggles = items.Where(item => string.Equals(item.Type, "toggle", StringComparison.OrdinalIgnoreCase)).ToArray()
        };
    }

    private static object BuildAppliedFilters(FilterState filterState)
    {
        return new
        {
            Options = FilterConfigs
                .Where(filter => filter.IsChoice)
                .ToDictionary(
                    filter => filter.Key,
                    filter => filterState.Options[filter.Key],
                    StringComparer.OrdinalIgnoreCase),
            Ranges = FilterConfigs
                .Where(filter => filter.IsRange)
                .ToDictionary(
                    filter => filter.Key,
                    filter =>
                    {
                        var selection = filterState.Ranges[filter.Key];
                        return new { selection.Min, selection.Max };
                    },
                    StringComparer.OrdinalIgnoreCase),
            Toggles = FilterConfigs
                .Where(filter => filter.IsToggle)
                .ToDictionary(
                    filter => filter.Key,
                    filter => filterState.Toggles[filter.Key],
                    StringComparer.OrdinalIgnoreCase)
        };
    }

    private static FilterItemResponse BuildFilter(FilterConfig filter, FilterState filterState, IReadOnlyCollection<Tour> tours)
    {
        return filter.Type switch
        {
            "tabs" or "checkboxes" => BuildChoiceFilter(filter, filterState, tours),
            "range" => BuildRangeFilter(filter, filterState, tours),
            "toggle" => BuildToggleFilter(filter, filterState, tours),
            _ => throw new InvalidOperationException($"Unknown filter type: {filter.Type}")
        };
    }

    private static FilterItemResponse BuildChoiceFilter(FilterConfig filter, FilterState filterState, IReadOnlyCollection<Tour> tours)
    {
        var availableTours = ApplyFilters(tours, filterState, filter.Key).ToArray();
        var selectedValues = filterState.Options[filter.Key];
        var items = filter.Options!
            .Select(option => new FilterOptionState(
                option.Name,
                option.Label,
                availableTours.Count(tour => filter.MatchOption!(tour, option.Name)),
                selectedValues.Contains(option.Name, StringComparer.OrdinalIgnoreCase)))
            .ToArray();

        return new FilterItemResponse(
            filter.Key,
            filter.Label,
            filter.Type,
            Multi: filter.Multi,
            SelectedValues: selectedValues,
            Items: items);
    }

    private static FilterItemResponse BuildRangeFilter(FilterConfig filter, FilterState filterState, IReadOnlyCollection<Tour> tours)
    {
        var availableTours = ApplyFilters(tours, filterState, filter.Key).ToArray();
        var boundsSource = availableTours.Length == 0 ? tours.ToArray() : availableTours;
        var min = boundsSource.Length == 0 ? 0m : boundsSource.Min(filter.SelectValue!);
        var max = boundsSource.Length == 0 ? 0m : boundsSource.Max(filter.SelectValue!);
        var selection = filterState.Ranges[filter.Key];

        return new FilterItemResponse(
            filter.Key,
            filter.Label,
            filter.Type,
            Format: filter.Format,
            MinQueryKey: filter.MinQueryKey,
            MaxQueryKey: filter.MaxQueryKey,
            Min: min,
            Max: max,
            SelectedMin: selection.Min,
            SelectedMax: selection.Max,
            Step: filter.Step);
    }

    private static FilterItemResponse BuildToggleFilter(FilterConfig filter, FilterState filterState, IReadOnlyCollection<Tour> tours)
    {
        var availableTours = ApplyFilters(tours, filterState, filter.Key).ToArray();

        return new FilterItemResponse(
            filter.Key,
            filter.Label,
            filter.Type,
            Selected: filterState.Toggles[filter.Key] == true,
            Count: availableTours.Count(filter.MatchToggle!));
    }

    private static FilterState ParseFilters(IQueryCollection query)
    {
        var options = FilterConfigs
            .Where(filter => filter.IsChoice)
            .ToDictionary(
                filter => filter.Key,
                filter => ParseOptionValues(query, filter.Key, filter.Multi),
                StringComparer.OrdinalIgnoreCase);

        var ranges = FilterConfigs
            .Where(filter => filter.IsRange)
            .ToDictionary(
                filter => filter.Key,
                filter => new RangeSelection(
                    ParseDecimal(query, filter.MinQueryKey!),
                    ParseDecimal(query, filter.MaxQueryKey!)),
                StringComparer.OrdinalIgnoreCase);

        var toggles = FilterConfigs
            .Where(filter => filter.IsToggle)
            .ToDictionary(
                filter => filter.Key,
                filter => ParseBool(query, filter.Key),
                StringComparer.OrdinalIgnoreCase);

        return new FilterState(options, ranges, toggles);
    }

    private static string[] ParseOptionValues(IQueryCollection query, string key, bool multi)
    {
        if (!query.TryGetValue(key, out var rawValues))
        {
            return Array.Empty<string>();
        }

        var values = rawValues
            .SelectMany(value => (value ?? string.Empty).Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (!multi && values.Length > 1)
        {
            return [values[0]];
        }

        return values;
    }

    private static bool? ParseBool(IQueryCollection query, string key)
    {
        if (!query.TryGetValue(key, out var rawValues))
        {
            return null;
        }

        var value = rawValues.FirstOrDefault();
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        if (bool.TryParse(value, out var parsed))
        {
            return parsed;
        }

        return value switch
        {
            "1" => true,
            "0" => false,
            _ => null
        };
    }

    private static decimal? ParseDecimal(IQueryCollection query, string key)
    {
        if (!query.TryGetValue(key, out var rawValues))
        {
            return null;
        }

        var rawValue = rawValues.FirstOrDefault();
        if (string.IsNullOrWhiteSpace(rawValue))
        {
            return null;
        }

        var normalizedValue = rawValue.Replace(',', '.');
        return decimal.TryParse(normalizedValue, NumberStyles.Number, CultureInfo.InvariantCulture, out var parsed)
            ? parsed
            : null;
    }

    private static IEnumerable<Tour> ApplyFilters(IEnumerable<Tour> source, FilterState filterState, string? excludedKey = null)
    {
        var filtered = source;

        foreach (var filter in FilterConfigs)
        {
            if (string.Equals(filter.Key, excludedKey, StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            if (filter.IsChoice)
            {
                var selectedValues = filterState.Options[filter.Key];
                if (selectedValues.Length == 0)
                {
                    continue;
                }

                filtered = filter.Multi
                    ? filtered.Where(tour => selectedValues.All(option => filter.MatchOption!(tour, option)))
                    : filtered.Where(tour => selectedValues.Any(option => filter.MatchOption!(tour, option)));

                continue;
            }

            if (filter.IsRange)
            {
                var selection = filterState.Ranges[filter.Key];
                if (selection.Min is { } min)
                {
                    filtered = filtered.Where(tour => filter.SelectValue!(tour) >= min);
                }

                if (selection.Max is { } max)
                {
                    filtered = filtered.Where(tour => filter.SelectValue!(tour) <= max);
                }

                continue;
            }

            if (filter.IsToggle && filterState.Toggles[filter.Key] == true)
            {
                filtered = filtered.Where(filter.MatchToggle!);
            }
        }

        return filtered;
    }

    private static bool MatchesTicketOption(Tour tour, string optionName)
    {
        return optionName switch
        {
            "instant" => HasChip(tour, "Instant confirmation"),
            "free" => tour.FreeCancellation,
            "guided" => ContainsTourValue(tour, "guided", "guide", "local guide"),
            "skip" => HasChip(tour, "Skip the line"),
            "fees" => ContainsTourValue(tour, "entrance", "ticket", "access"),
            "privateTour" => ContainsTourValue(tour, "private"),
            "meal" => ContainsTourValue(tour, "dinner", "meal"),
            _ => false
        };
    }

    private static bool HasChip(Tour tour, string chip)
    {
        return tour.Chips.Any(x => string.Equals(x, chip, StringComparison.OrdinalIgnoreCase));
    }

    private static bool ContainsTourValue(Tour tour, params string[] terms)
    {
        return MatchesAny(tour.Title, terms) ||
               MatchesAny(tour.Description, terms) ||
               MatchesAny(tour.DescriptionHtml, terms) ||
               tour.Chips.Any(chip => MatchesAny(chip, terms)) ||
               tour.Included.Any(item => MatchesAny(item, terms));
    }

    private static bool MatchesAny(string value, IEnumerable<string> terms)
    {
        return terms.Any(term => value.Contains(term, StringComparison.OrdinalIgnoreCase));
    }

    private static Tour MapSeedToEntity(TourSeed seed)
    {
        var tour = new Tour
        {
            Slug = seed.Slug,
            Title = seed.Title,
            Description = seed.Description,
            HeroUrl = seed.HeroUrl,
            Category = seed.Category,
            Rating = seed.Rating,
            ReviewsCount = seed.ReviewsCount,
            PriceFrom = seed.PriceFrom,
            Duration = seed.Duration,
            Languages = seed.Languages,
            FreeCancellation = seed.FreeCancellation,
            Chips = CloneItems(seed.Chips),
            Love = CloneItems(seed.Love),
            DescriptionHtml = seed.DescriptionHtml,
            Included = CloneItems(seed.Included),
            Remember = NormalizeItems([seed.RememberFirst, seed.RememberSecond]),
            Meeting = seed.Meeting,
            Address = seed.Address,
            CancelPolicy = seed.CancelPolicy
        };

        NormalizeTour(tour);
        return tour;
    }

    private static string NormalizeText(string? value)
    {
        return value?.Trim() ?? string.Empty;
    }

    private static string[] NormalizeItems(string[]? values)
    {
        return values?
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value.Trim())
            .ToArray() ?? Array.Empty<string>();
    }

    private static string[] CloneItems(string[]? values)
    {
        return values?.ToArray() ?? Array.Empty<string>();
    }

    private sealed record FilterOptionSeed(string Name, string Label);

    private sealed record FilterConfig(
        string Key,
        string Label,
        string Type,
        bool Multi = false,
        FilterOptionSeed[]? Options = null,
        Func<Tour, string, bool>? MatchOption = null,
        string? Format = null,
        string? MinQueryKey = null,
        string? MaxQueryKey = null,
        Func<Tour, decimal>? SelectValue = null,
        decimal? Step = null,
        Func<Tour, bool>? MatchToggle = null)
    {
        public bool IsChoice => Type is "tabs" or "checkboxes";
        public bool IsRange => string.Equals(Type, "range", StringComparison.OrdinalIgnoreCase);
        public bool IsToggle => string.Equals(Type, "toggle", StringComparison.OrdinalIgnoreCase);

        public static FilterConfig Choice(
            string key,
            string label,
            string type,
            bool multi,
            FilterOptionSeed[] options,
            Func<Tour, string, bool> matchOption)
        {
            return new(key, label, type, multi, options, matchOption);
        }

        public static FilterConfig Range(
            string key,
            string label,
            string format,
            string minQueryKey,
            string maxQueryKey,
            Func<Tour, decimal> selectValue,
            decimal step)
        {
            return new(key, label, "range", false, null, null, format, minQueryKey, maxQueryKey, selectValue, step);
        }

        public static FilterConfig Toggle(string key, string label, Func<Tour, bool> matchToggle)
        {
            return new(key, label, "toggle", false, null, null, null, null, null, null, null, matchToggle);
        }
    }

    private sealed record FilterState(
        Dictionary<string, string[]> Options,
        Dictionary<string, RangeSelection> Ranges,
        Dictionary<string, bool?> Toggles);

    private sealed record RangeSelection(decimal? Min, decimal? Max);

    private sealed record FilterOptionState(string Name, string Label, int Count, bool Selected);

    private sealed record FilterItemResponse(
        string Key,
        string Label,
        string Type,
        bool Multi = false,
        string[]? SelectedValues = null,
        FilterOptionState[]? Items = null,
        string? Format = null,
        string? MinQueryKey = null,
        string? MaxQueryKey = null,
        decimal? Min = null,
        decimal? Max = null,
        decimal? SelectedMin = null,
        decimal? SelectedMax = null,
        decimal? Step = null,
        bool? Selected = null,
        int? Count = null);
}
