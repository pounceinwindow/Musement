import s from '../../pages/TourDetailPage.module.css';

function BookingSidebar({tour, qty, onQtyChange, totalPrice}) {
    return (
        <aside className={s.bookCard}>
            <h3>Book your ticket</h3>
            <div className={s.best}>
                <span>&#9733; Best choice</span>
            </div>
            <p className={s.muted}>
                From <b>{tour.price}</b> per person
            </p>
            <div className={s.ticketBox}>
                <div className={s.ticket}>Standard ticket</div>
                <div className={s.bookRow}>
                    <div>
                        <div className={s.muted}>Instant confirmation</div>
                        <div className={s.muted}>Mobile ticket accepted</div>
                    </div>
                    <div className={s.priceBlue}>{tour.price}</div>
                </div>
                <div className={s.bookRow}>
                    <div className={s.muted}>Select quantity</div>
                    <div className={s.qty}>
                        <button type="button" onClick={() => onQtyChange(Math.max(1, qty - 1))}>
                            -
                        </button>
                        <span className={s.qtyValue}>{qty}</span>
                        <button type="button" onClick={() => onQtyChange(qty + 1)}>
                            +
                        </button>
                    </div>
                </div>
                <div className={`${s.bookRow} ${s.totalRow}`}>
                    <div className={s.muted}>Total</div>
                    <div className={s.totalBlue}>${totalPrice}</div>
                </div>
            </div>
            <div className={s.cta}>
                <button type="button">Check availability</button>
                <button type="button">Book now</button>
            </div>
            <p className={`${s.muted} ${s.bookCardNote}`}>
                Free cancellation according to the policy. No extra fees.
            </p>
        </aside>
    );
}

export default BookingSidebar;
