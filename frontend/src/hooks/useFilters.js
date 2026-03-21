import {startTransition, useEffect, useMemo, useState} from 'react';
import {fetchTours} from '../api/tours';

const SORTERS = {
    popularity: (a, b) => b.reviewsCount - a.reviewsCount,
    rating: (a, b) => b.rating - a.rating,
    price_asc: (a, b) => a.priceFrom - b.priceFrom,
    price_desc: (a, b) => b.priceFrom - a.priceFrom,
};

const EMPTY_SELECTION = {
    options: {},
    ranges: {},
    toggles: {},
};

function useFilters() {
    const [selection, setSelection] = useState(EMPTY_SELECTION);
    const [payload, setPayload] = useState(null);
    const [sort, setSort] = useState('popularity');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadTours() {
            setLoading(true);
            setError('');

            try {
                const response = await fetchTours(buildQueryParams(selection));
                if (!cancelled) {
                    setPayload(response);
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError.message || 'Failed to load tours.');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadTours();

        return () => {
            cancelled = true;
        };
    }, [selection]);

    const filterItems = payload?.filters?.items ?? [];
    const categoryFilter = filterItems.find((item) => item.type === 'tabs') ?? null;
    const sidebarFilters = filterItems.filter((item) => item.type !== 'tabs');
    const tours = payload?.tours ?? [];
    const totalCount = payload?.totalCount ?? tours.length;

    const filteredTours = useMemo(() => {
        const sorter = SORTERS[sort] ?? SORTERS.popularity;
        return [...tours].sort(sorter);
    }, [sort, tours]);

    const activeCategory = categoryFilter?.selectedValues?.[0] ?? null;

    const setActiveCategory = (category) => {
        startTransition(() => {
            setSelection((prev) => ({
                ...prev,
                options: {
                    ...prev.options,
                    category: category ? [category] : [],
                },
            }));
        });
    };

    const toggleOption = (group, optionName, checked) => {
        startTransition(() => {
            setSelection((prev) => {
                const currentValues = prev.options[group.key] ?? [];
                const nextValues = group.multi
                    ? checked
                        ? [...currentValues, optionName]
                        : currentValues.filter((value) => value !== optionName)
                    : checked
                        ? [optionName]
                        : [];

                return {
                    ...prev,
                    options: {
                        ...prev.options,
                        [group.key]: Array.from(new Set(nextValues)),
                    },
                };
            });
        });
    };

    const updateRange = (range, nextMin, nextMax) => {
        startTransition(() => {
            setSelection((prev) => ({
                ...prev,
                ranges: {
                    ...prev.ranges,
                    [range.key]: {
                        min: nextMin,
                        max: nextMax,
                        minQueryKey: range.minQueryKey,
                        maxQueryKey: range.maxQueryKey,
                    },
                },
            }));
        });
    };

    const toggleFlag = (toggle, checked) => {
        startTransition(() => {
            setSelection((prev) => ({
                ...prev,
                toggles: {
                    ...prev.toggles,
                    [toggle.key]: checked,
                },
            }));
        });
    };

    return {
        activeCategory,
        categoryFilter,
        error,
        filteredTours,
        filterItems,
        loading,
        setActiveCategory,
        setSort,
        sidebarFilters,
        sort,
        toggleFlag,
        toggleOption,
        totalCount,
        updateRange,
    };
}

function buildQueryParams(selection) {
    const params = new URLSearchParams();

    for (const [key, values] of Object.entries(selection.options)) {
        if (!Array.isArray(values) || values.length === 0) {
            continue;
        }

        params.set(key, values.join(','));
    }

    for (const range of Object.values(selection.ranges)) {
        if (!range) {
            continue;
        }

        if (range.min !== undefined && range.min !== null) {
            params.set(range.minQueryKey, String(range.min));
        }

        if (range.max !== undefined && range.max !== null) {
            params.set(range.maxQueryKey, String(range.max));
        }
    }

    for (const [key, checked] of Object.entries(selection.toggles)) {
        if (checked) {
            params.set(key, 'true');
        }
    }

    return params;
}

export default useFilters;
