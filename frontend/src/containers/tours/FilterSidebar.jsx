import {useMemo, useState} from 'react';
import {MAX_PRICE, MIN_PRICE} from '../../data/tours';
import s from './FilterSidebar.module.css';

function FilterSidebar({filters, categories, onFilterChange}) {
    const [priceOpen, setPriceOpen] = useState(false);
    const [ticketsOpen, setTicketsOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    return (
        <aside aria-label="Filters" className={s.aside}>
            <form className={s.filters} onSubmit={(e) => e.preventDefault()}>
                <PriceFilter
                    priceMin={filters.priceMin}
                    priceMax={filters.priceMax}
                    onChange={onFilterChange}
                    isOpen={priceOpen}
                    onToggle={() => setPriceOpen((prev) => !prev)}
                />

                <div className={`${s.group} ${ticketsOpen ? '' : s.collapsed}`}>
                    <button
                        aria-expanded={ticketsOpen}
                        className={s.heading}
                        type="button"
                        onClick={() => setTicketsOpen((prev) => !prev)}
                    >
                        Tickets option
                    </button>
                    {ticketsOpen && (
                        <div className={s.checks}>
                            {TICKET_OPTIONS.map((opt) => (
                                <label className={s.check} key={opt.name}>
                                    <input
                                        type="checkbox"
                                        checked={filters[opt.name] || false}
                                        onChange={(e) => onFilterChange({[opt.name]: e.target.checked})}
                                    />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`${s.group} ${categoriesOpen ? '' : s.collapsed}`}>
                    <button
                        aria-expanded={categoriesOpen}
                        className={s.heading}
                        type="button"
                        onClick={() => setCategoriesOpen((prev) => !prev)}
                    >
                        Categories
                    </button>
                    {categoriesOpen && (
                        <div className={s.checks}>
                            {categories.map((cat) => (
                                <label className={s.check} key={cat}>
                                    <input
                                        type="checkbox"
                                        checked={filters.selectedCategories.includes(cat)}
                                        onChange={(e) => {
                                            const next = e.target.checked
                                                ? [...filters.selectedCategories, cat]
                                                : filters.selectedCategories.filter((c) => c !== cat);
                                            onFilterChange({selectedCategories: next});
                                        }}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </form>
        </aside>
    );
}

const TICKET_OPTIONS = [
    {name: 'instant', label: 'Instant confirmation'},
    {name: 'free', label: 'Free cancellation'},
    {name: 'guided', label: 'Guided tour'},
    {name: 'skip', label: 'Skip the line'},
    {name: 'fees', label: 'Entrance fees included'},
    {name: 'privateTour', label: 'Private Tour'},
    {name: 'meal', label: 'Meal Included'},
];

function PriceFilter({priceMin, priceMax, onChange, isOpen, onToggle}) {
    const fillStyle = useMemo(() => {
        const range = MAX_PRICE - MIN_PRICE;
        if (range <= 0) {
            return {left: '0%', width: '0%'};
        }

        const left = ((priceMin - MIN_PRICE) / range) * 100;
        const width = ((priceMax - MIN_PRICE) / range) * 100 - left;
        return {left: `${left}%`, width: `${width}%`};
    }, [priceMin, priceMax]);

    const handleMin = (e) => {
        const val = Number(e.target.value);
        if (val < priceMax) {
            onChange({priceMin: val});
        }
    };

    const handleMax = (e) => {
        const val = Number(e.target.value);
        if (val > priceMin) {
            onChange({priceMax: val});
        }
    };

    return (
        <div className={`${s.group} ${isOpen ? '' : s.collapsed}`}>
            <button
                aria-expanded={isOpen}
                className={s.heading}
                type="button"
                onClick={onToggle}
            >
                Price (per adult)
            </button>
            {isOpen && (
                <>
                    <div aria-label="Price range" className={s.range}>
                        <div aria-hidden="true" className={s.track}/>
                        <div aria-hidden="true" className={s.fill} style={fillStyle}/>
                        <input
                            type="range"
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            step={1}
                            value={priceMin}
                            style={{zIndex: priceMin > MAX_PRICE - 50 ? 5 : 3}}
                            onChange={handleMin}
                        />
                        <input
                            type="range"
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            step={1}
                            value={priceMax}
                            onChange={handleMax}
                        />
                    </div>
                    <div aria-hidden="true" className={s.minMax}>
                        <div className={s.box}>
                            <span>Min:</span>
                            <strong>${priceMin}</strong>
                        </div>
                        <div className={s.box}>
                            <span>Max:</span>
                            <strong>${priceMax}</strong>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default FilterSidebar;
