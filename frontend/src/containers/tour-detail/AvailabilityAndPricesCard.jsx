import {useEffect, useMemo, useState} from 'react';
import s from './AvailabilityAndPricesCard.module.css';

function AvailabilityAndPricesCard({tour}) {
    const tickets = useMemo(() => buildTickets(tour.priceFrom), [tour.priceFrom]);
    const [selectedDate, setSelectedDate] = useState(getTodayIsoDate());
    const [quantitiesByTicketId, setQuantitiesByTicketId] = useState(() => buildZeroQuantities(tickets));

    useEffect(() => {
        setQuantitiesByTicketId(buildZeroQuantities(tickets));
        setSelectedDate(getTodayIsoDate());
    }, [tickets]);

    const total = useMemo(
        () => tickets.reduce((sum, ticket) => sum + ticket.price * (quantitiesByTicketId[ticket.id] || 0), 0),
        [tickets, quantitiesByTicketId]
    );

    const formattedDate = formatLongDate(selectedDate);
    const isDisabled = total === 0;

    const changeQuantity = (ticketId, delta) => {
        setQuantitiesByTicketId((prev) => {
            const next = Math.max(0, (prev[ticketId] || 0) + delta);
            return {...prev, [ticketId]: next};
        });
    };

    return (
        <aside className={s.card}>
            <h3 className={s.title}>Availability and prices</h3>
            <div className={s.valueBadge}>
                <TagIcon/>
                <span>Best value guaranteed</span>
            </div>

            <div className={s.section}>
                <div className={s.label}>Select date</div>
                <label className={s.dateField}>
                    <CalendarIcon/>
                    <span className={s.dateValue}>{formattedDate}</span>
                    <ChevronDownIcon/>
                    <input
                        aria-label="Select date"
                        className={s.nativeDate}
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value || getTodayIsoDate())}
                    />
                </label>
            </div>

            <div className={s.offerCard}>
                <label className={s.radioRow}>
                    <input
                        aria-label="Tour option"
                        type="radio"
                        name="ticket-option"
                        checked
                        onChange={() => {}}
                    />
                    <span>TOUR</span>
                </label>

                <div className={s.timeRow}>
                    <ClockIcon/>
                    <span>Only available at 10:00</span>
                </div>

                <div className={s.ticketHeading}>Select your tickets</div>

                <div className={s.ticketList}>
                    {tickets.map((ticket) => {
                        const qty = quantitiesByTicketId[ticket.id] || 0;
                        const ticketKey = `${ticket.label.toLowerCase()} tickets`;
                        return (
                            <div className={s.ticketRow} key={ticket.id}>
                                <div className={s.ticketInfo}>
                                    <div className={s.ticketLabel}>
                                        {ticket.label} ({ticket.ageRange})
                                    </div>
                                    <div className={s.ticketPrice}>{formatPrice(ticket.price)}</div>
                                </div>

                                <div className={s.stepper}>
                                    <button
                                        aria-label={`Decrease ${ticketKey}`}
                                        className={s.stepperBtn}
                                        disabled={qty === 0}
                                        type="button"
                                        onClick={() => changeQuantity(ticket.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span className={s.qty}>{qty}</span>
                                    <button
                                        aria-label={`Increase ${ticketKey}`}
                                        className={`${s.stepperBtn} ${s.stepperBtnPlus}`}
                                        type="button"
                                        onClick={() => changeQuantity(ticket.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={s.totalRow}>
                    <span>Total</span>
                    <strong className={s.totalValue}>{formatPrice(total)}</strong>
                </div>

                <div className={s.actions}>
                    <button className={s.secondaryBtn} disabled={isDisabled} type="button">
                        Add to cart
                    </button>
                    <button className={s.primaryBtn} disabled={isDisabled} type="button">
                        Checkout
                    </button>
                </div>
            </div>
        </aside>
    );
}

function buildTickets(basePrice) {
    const adultPrice = Number(basePrice) || 0;
    const childPrice = Number((adultPrice * 0.7).toFixed(2));
    return [
        {id: 'adult', label: 'Adult', ageRange: '12-99', price: adultPrice},
        {id: 'child', label: 'Child', ageRange: '4-11', price: childPrice},
    ];
}

function buildZeroQuantities(tickets) {
    return tickets.reduce((acc, ticket) => {
        acc[ticket.id] = 0;
        return acc;
    }, {});
}

function getTodayIsoDate() {
    return new Date().toISOString().slice(0, 10);
}

function formatLongDate(isoDate) {
    const date = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}

function formatPrice(value) {
    return `$${Number(value || 0).toFixed(2)}`;
}

function TagIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={s.icon}>
            <path d="M20 10.59V4a2 2 0 0 0-2-2h-6.59a2 2 0 0 0-1.41.59l-8 8a2 2 0 0 0 0 2.82l8.59 8.59a2 2 0 0 0 2.82 0l8-8a2 2 0 0 0 .59-1.41zM8.5 7A1.5 1.5 0 1 1 10 5.5 1.5 1.5 0 0 1 8.5 7z"/>
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={s.icon}>
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2zm0 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10h14z"/>
        </svg>
    );
}

function ChevronDownIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={s.icon}>
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={s.icon}>
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h-4V7h2v4h2z"/>
        </svg>
    );
}

export default AvailabilityAndPricesCard;
