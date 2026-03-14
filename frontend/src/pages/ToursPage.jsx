import Hero from '../containers/tours/Hero';
import FilterSidebar from '../containers/tours/FilterSidebar';
import CategoryTabs from '../containers/tours/CategoryTabs';
import SortBar from '../containers/tours/SortBar';
import TourGrid from '../components/TourGrid';
import IntroSection from '../containers/tours/IntroSection';
import CitySection from '../containers/tours/CitySection';
import useFilters from '../hooks/useFilters';
import {CATEGORIES} from '../data/tours';
import s from './ToursPage.module.css';

function ToursPage() {
    const {
        filters,
        updateFilters,
        activeCategory,
        setActiveCategory,
        sort,
        setSort,
        filteredTours,
    } = useFilters();

    return (
        <>
            <Hero/>

            <main className={s.toursPage} role="main">
                <div className={s.toursGrid}>
                    <FilterSidebar
                        filters={filters}
                        categories={CATEGORIES}
                        onFilterChange={updateFilters}
                    />

                    <section aria-label="Results" className={s.resultsArea}>
                        <CategoryTabs
                            categories={CATEGORIES}
                            activeCategory={activeCategory}
                            onSelect={setActiveCategory}
                        />

                        <SortBar
                            totalCount={filteredTours.length}
                            sort={sort}
                            onSortChange={setSort}
                        />

                        <TourGrid tours={filteredTours}/>
                    </section>
                </div>

                <IntroSection/>
            </main>

            <CitySection/>
        </>
    );
}

export default ToursPage;
