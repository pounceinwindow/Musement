import s from '../../pages/TourDetailPage.module.css';

function ReviewsSection({tour}) {
    return (
        <section id="reviews">
            <h2>Reviews</h2>
            <div className={s.reviewsGrid}>
                <div>
                    <div className={s.scoreBig}>{tour.rating}</div>
                    <p className={s.muted}>
                        Based on <b>{tour.reviewsCount}</b> verified reviews
                    </p>
                    <div>
                        <div>Excellent</div>
                        <div className={s.bar}>
                            <span className={s.barFillExcellent}/>
                        </div>
                    </div>
                    <div>
                        <div>Very good</div>
                        <div className={s.bar}>
                            <span className={s.barFillVeryGood}/>
                        </div>
                    </div>
                </div>
                <div>
                    {tour.reviews && tour.reviews.length > 0 ? (
                        tour.reviews.map((review, index) => (
                            <div className={s.reviewItem} key={index}>
                                <div>
                                    <b>{review.author}</b>
                                    <div className={s.reviewMeta}>
                                        {review.createdAt} &bull; {review.rating}/5
                                    </div>
                                    <p className={s.reviewComment}>{review.comment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={s.muted}>No reviews yet. Be the first to share your experience.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ReviewsSection;
