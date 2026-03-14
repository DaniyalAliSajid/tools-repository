export const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'USD ($)' },
    { code: 'EUR', symbol: '€', name: 'EUR (€)' },
    { code: 'GBP', symbol: '£', name: 'GBP (£)' },
    { code: 'JPY', symbol: '¥', name: 'JPY (¥)' },
    { code: 'INR', symbol: '₹', name: 'INR (₹)' },
    { code: 'AUD', symbol: 'A$', name: 'AUD (A$)' },
    { code: 'CAD', symbol: 'C$', name: 'CAD (C$)' },
    { code: 'CNY', symbol: '¥', name: 'CNY (¥)' },
    { code: 'AED', symbol: 'د.إ', name: 'AED (د.إ)' },
    { code: 'SAR', symbol: '﷼', name: 'SAR (﷼)' },
];

export function getCurrencyOptionsHTML(): string {
    return CURRENCIES.map(c => `<option value="${c.symbol}">${c.name}</option>`).join('');
}
