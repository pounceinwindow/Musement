import Hero from '../containers/tours/Hero';
import FilterSidebar from '../containers/tours/FilterSidebar';
import CategoryTabs from '../containers/tours/CategoryTabs';
import SortBar from '../containers/tours/SortBar';
import TourGrid from '../components/TourGrid';
import IntroSection from '../containers/tours/IntroSection';
import CitySection from '../containers/tours/CitySection';
import useFilters from '../hooks/useFilters';
import s from './ToursPage.module.css';

function ToursPage() {
    const {
        activeCategory,
        categoryFilter,
        error,
        filteredTours,
        loading,
        setActiveCategory,
        sort,
        setSort,
        sidebarFilters,
        toggleFlag,
        toggleOption,
        totalCount,
        updateRange,
    } = useFilters();

    return (
        <>
            <Hero/>

            <main className={s.toursPage} role="main">
                <div className={s.toursGrid}>
                    <FilterSidebar
                        filters={sidebarFilters}
                        loading={loading}
                        onRangeChange={updateRange}
                        onToggleChange={toggleFlag}
                        onOptionChange={toggleOption}
                    />

                    <section aria-label="Results" className={s.resultsArea}>
                        <CategoryTabs
                            categoryFilter={categoryFilter}
                            activeCategory={activeCategory}
                            onSelect={setActiveCategory}
                        />

                        <SortBar
                            totalCount={totalCount}
                            sort={sort}
                            onSortChange={setSort}
                        />

                        {error ? <p>{error}</p> : null}
                        {!error && loading ? <p>Loading tours...</p> : null}
                        {!error && !loading ? <TourGrid tours={filteredTours}/> : null}
                    </section>
                </div>

                <IntroSection/>
            </main>

            <CitySection/>
        </>
    );
}

export default ToursPage;
