export function formatNumberToCurrency(amount: number) {
    return Intl.NumberFormat('si-LK',{
        style: 'currency',
        currency: 'LKR'
    }).format(amount)
}