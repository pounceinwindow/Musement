import s from './SortBar.module.css';

function SortBar({totalCount, sort, onSortChange}) {
    return (
        <div className={s.head}>
            <div>
                <label>{totalCount}</label> Experiences
            </div>
            <div aria-label="Sort options" className={s.sort} role="group">
                <label htmlFor="sortSelect">Sort by:</label>
                <select
                    id="sortSelect"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="price_desc">Highest price</option>
                    <option value="price_asc">Lowest price</option>
                </select>
            </div>
        </div>
    );
}

export default SortBar;
