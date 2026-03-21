import {useEffect, useMemo, useState} from 'react';
import s from './FilterSidebar.module.css';

function FilterSidebar({filters, loading, onOptionChange, onRangeChange, onToggleChange}) {
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        setOpenSections((prev) => {
            const next = {...prev};

            for (const filter of filters) {
                if (!(filter.key in next)) {
                    next[filter.key] = true;
                }
            }

            return next;
        });
    }, [filters]);

    return (
        <aside aria-label="Filters" className={s.aside}>
            <form className={s.filters} onSubmit={(event) => event.preventDefault()}>
                {loading && filters.length === 0 ? <p>Loading filters...</p> : null}

                {filters.map((filter) => (
                    <FilterGroup
                        key={filter.key}
                        filter={filter}
                        isOpen={openSections[filter.key] ?? true}
                        onOptionChange={onOptionChange}
                        onRangeChange={onRangeChange}
                        onToggleChange={onToggleChange}
                        onToggleOpen={() =>
                            setOpenSections((prev) => ({
                                ...prev,
                                [filter.key]: !prev[filter.key],
                            }))
                        }
                    />
                ))}
            </form>
        </aside>
    );
}

function FilterGroup({filter, isOpen, onOptionChange, onRangeChange, onToggleChange, onToggleOpen}) {
    return (
        <div className={`${s.group} ${isOpen ? '' : s.collapsed}`}>
            <button
                aria-expanded={isOpen}
                className={s.heading}
                type="button"
                onClick={onToggleOpen}
            >
                {filter.label}
            </button>

            {isOpen ? <FilterContent filter={filter} onOptionChange={onOptionChange} onRangeChange={onRangeChange} onToggleChange={onToggleChange}/> : null}
        </div>
    );
}

function FilterContent({filter, onOptionChange, onRangeChange, onToggleChange}) {
    if (filter.type === 'checkboxes') {
        return (
            <div className={s.checks}>
                {filter.items.map((option) => (
                    <label className={s.check} key={option.name}>
                        <input
                            type="checkbox"
                            checked={option.selected}
                            disabled={option.count === 0 && !option.selected}
                            onChange={(event) => onOptionChange(filter, option.name, event.target.checked)}
                        />
                        {option.label} ({option.count})
                    </label>
                ))}
            </div>
        );
    }

    if (filter.type === 'toggle') {
        return (
            <div className={s.checks}>
                <label className={s.check}>
                    <input
                        type="checkbox"
                        checked={filter.selected}
                        disabled={filter.count === 0 && !filter.selected}
                        onChange={(event) => onToggleChange(filter, event.target.checked)}
                    />
                    {filter.label} ({filter.count})
                </label>
            </div>
        );
    }

    if (filter.type === 'range') {
        return <RangeFilter filter={filter} onChange={onRangeChange}/>;
    }

    return null;
}

function RangeFilter({filter, onChange}) {
    const minValue = filter.selectedMin ?? filter.min;
    const maxValue = filter.selectedMax ?? filter.max;

    const fillStyle = useMemo(() => {
        const range = filter.max - filter.min;
        if (range <= 0) {
            return {left: '0%', width: '0%'};
        }

        const left = ((minValue - filter.min) / range) * 100;
        const width = ((maxValue - filter.min) / range) * 100 - left;
        return {left: `${left}%`, width: `${width}%`};
    }, [filter.max, filter.min, maxValue, minValue]);

    const handleMin = (event) => {
        const nextValue = Number(event.target.value);
        onChange(filter, Math.min(nextValue, maxValue), maxValue);
    };

    const handleMax = (event) => {
        const nextValue = Number(event.target.value);
        onChange(filter, minValue, Math.max(nextValue, minValue));
    };

    return (
        <>
            <div aria-label={`${filter.label} range`} className={s.range}>
                <div aria-hidden="true" className={s.track}/>
                <div aria-hidden="true" className={s.fill} style={fillStyle}/>
                <input
                    type="range"
                    min={filter.min}
                    max={filter.max}
                    step={filter.step}
                    value={minValue}
                    onChange={handleMin}
                />
                <input
                    type="range"
                    min={filter.min}
                    max={filter.max}
                    step={filter.step}
                    value={maxValue}
                    onChange={handleMax}
                />
            </div>
            <div aria-hidden="true" className={s.minMax}>
                <div className={s.box}>
                    <span>Min:</span>
                    <strong>{formatRangeValue(minValue, filter.format)}</strong>
                </div>
                <div className={s.box}>
                    <span>Max:</span>
                    <strong>{formatRangeValue(maxValue, filter.format)}</strong>
                </div>
            </div>
        </>
    );
}

function formatRangeValue(value, format) {
    if (format === 'rating') {
        return value.toFixed(1);
    }

    return `$${Number(value).toFixed(0)}`;
}

export default FilterSidebar;
