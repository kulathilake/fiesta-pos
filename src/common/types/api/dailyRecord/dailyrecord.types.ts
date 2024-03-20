export type GetDailyRecordParams = {
    date: Date
}
export type OpenDailyRecordRequest = {
    date: Date
    openingTime: Date
    openingCashBalance: number
    openedBy: string | number
}

export type CloseDailyRecordRequest = {
    id: number
    endingTime: Date
    actualCashBalance: number;
    totalSales: number;
    totalExpenses: number;
    toCashLodge: number;
    toCashDrawer: number;
    closedBy: string | number;
}