import s from '../../pages/TourDetailPage.module.css';

function ReviewsSection({tour}) {
    const ratingLabel = getRatingLabel(tour.rating);

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
                        <div>{ratingLabel}</div>
                        <div className={s.bar}>
                            <span className={s.barFillExcellent}/>
                        </div>
                    </div>
                    <div>
                        <div>{getSecondaryLabel(ratingLabel)}</div>
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

function getRatingLabel(rating) {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Great';
    if (rating >= 3) return 'Average';
    if (rating >= 2) return 'Poor';
    return 'Bad';
}

function getSecondaryLabel(primaryLabel) {
    return primaryLabel === 'Excellent' ? 'Great' : 'Average';
}

export default ReviewsSection;
