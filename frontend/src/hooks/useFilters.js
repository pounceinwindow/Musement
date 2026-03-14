import {useMemo, useState} from 'react';
import {MAX_PRICE, MIN_PRICE, TOURS} from '../data/tours';

const TICKET_FILTER_RULES = {
    instant: (tour) => hasChip(tour, 'instant confirmation'),
    guided: (tour) => hasChip(tour, 'guided tour'),
    skip: (tour) => hasChip(tour, 'skip the line'),
    fees: (tour) => hasChip(tour, 'entrance fees included'),
    privateTour: (tour) => hasChip(tour, 'private tour'),
    meal: (tour) => hasChip(tour, 'meal included'),
};

const DEFAULT_FILTERS = {
    priceMin: MIN_PRICE,
    priceMax: MAX_PRICE,
    instant: false,
    free: false,
    guided: false,
    skip: false,
    fees: false,
    privateTour: false,
    meal: false,
    selectedCategories: [],
};

const SORTERS = {
    popularity: (a, b) => b.reviewsCount - a.reviewsCount,
    rating: (a, b) => b.rating - a.rating,
    price_asc: (a, b) => a.priceFrom - b.priceFrom,
    price_desc: (a, b) => b.priceFrom - a.priceFrom,
};

function useFilters() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const [activeCategory, setActiveCategory] = useState(null);
    const [sort, setSort] = useState('popularity');

    const updateFilters = (patch) => {
        setFilters((prev) => ({...prev, ...patch}));
    };

    const filteredTours = useMemo(() => {
        const visibleTours = TOURS.filter((tour) => matchesFilters(tour, filters, activeCategory));
        const sorter = SORTERS[sort] ?? SORTERS.popularity;
        return [...visibleTours].sort(sorter);
    }, [filters, activeCategory, sort]);

    return {
        filters,
        updateFilters,
        activeCategory,
        setActiveCategory,
        sort,
        setSort,
        filteredTours,
    };
}

function matchesFilters(tour, filters, activeCategory) {
    return (
        isInPriceRange(tour, filters) &&
        matchesFreeCancellation(tour, filters) &&
        matchesSelectedCategories(tour, filters) &&
        matchesActiveCategory(tour, activeCategory) &&
        matchesTicketOptions(tour, filters)
    );
}

function isInPriceRange(tour, filters) {
    return tour.priceFrom >= filters.priceMin && tour.priceFrom <= filters.priceMax;
}

function matchesFreeCancellation(tour, filters) {
    return !filters.free || tour.freeCancellation;
}

function matchesSelectedCategories(tour, filters) {
    return (
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(tour.category)
    );
}

function matchesActiveCategory(tour, activeCategory) {
    return !activeCategory || tour.category === activeCategory;
}

function matchesTicketOptions(tour, filters) {
    return !Object.entries(TICKET_FILTER_RULES).some(([key, rule]) => filters[key] && !rule(tour));
}

function hasChip(tour, chipName) {
    return tour.chips.some((chip) => chip.toLowerCase() === chipName);
}

export default useFilters;
