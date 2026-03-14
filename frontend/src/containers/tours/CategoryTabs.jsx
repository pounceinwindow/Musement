import CategoryIcon from '../../components/CategoryIcon';
import s from './CategoryTabs.module.css';

function CategoryTabs({categories, activeCategory, onSelect}) {
    return (
        <div aria-label="Categories" className={s.tabs} role="tablist">
            {categories.map((cat) => (
                <button
                    type="button"
                    key={cat}
                    className={`${s.tab} ${activeCategory === cat ? s.active : ''}`}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => onSelect(activeCategory === cat ? null : cat)}
                >
                    <CategoryIcon name={cat}/>
                    {cat}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;
