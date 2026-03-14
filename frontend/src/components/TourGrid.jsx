import TourCard from './TourCard';
import s from './TourGrid.module.css';

function TourGrid({tours}) {
    if (tours.length === 0) {
        return (
            <div className={s.cardsGrid}>
                <div className={s.empty}>Nothing found. Try changing filters.</div>
            </div>
        );
    }

    return (
        <div className={s.cardsGrid}>
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour}/>
            ))}
        </div>
    );
}

export default TourGrid;
