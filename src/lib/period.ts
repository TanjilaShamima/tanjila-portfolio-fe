const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Month index since year 0, so ranges can be compared and subtracted directly. */
const toMonthIndex = (text: string): number | null => {
    const match = text.trim().toLowerCase().match(/^([a-z]{3})[a-z]*\s+(\d{4})$/);
    if (!match) return null;
    const month = MONTHS.indexOf(match[1]);
    return month === -1 ? null : Number(match[2]) * 12 + month;
};

export const currentMonthIndex = () => {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
};

/** Parses "May 2024 – Nov 2025" or "Dec 2025 – Present". End is inclusive. */
export const parsePeriod = (period: string) => {
    const [startText, endText = ''] = period.split(/\s*[–-]\s*/);
    const start = toMonthIndex(startText) ?? currentMonthIndex();
    const end = /present/i.test(endText) ? currentMonthIndex() : toMonthIndex(endText) ?? start;
    return { start, end, months: end - start + 1 };
};

export const formatDuration = (months: number) => {
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return [years && `${years} yr${years > 1 ? 's' : ''}`, rest && `${rest} mo`].filter(Boolean).join(' ') || '1 mo';
};
