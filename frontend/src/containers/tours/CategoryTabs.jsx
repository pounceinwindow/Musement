import CategoryIcon from '../../components/CategoryIcon';
import s from './CategoryTabs.module.css';

function CategoryTabs({categoryFilter, activeCategory, onSelect}) {
    if (!categoryFilter || categoryFilter.items.length === 0) {
        return null;
    }

    return (
        <div aria-label="Categories" className={s.tabs} role="tablist">
            {categoryFilter.items.map((category) => (
                <button
                    type="button"
                    key={category.name}
                    className={`${s.tab} ${activeCategory === category.name ? s.active : ''}`}
                    role="tab"
                    aria-selected={activeCategory === category.name}
                    disabled={category.count === 0 && activeCategory !== category.name}
                    onClick={() => onSelect(activeCategory === category.name ? null : category.name)}
                >
                    <CategoryIcon name={category.label}/>
                    {category.label}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;
