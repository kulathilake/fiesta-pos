import { Bill, BillItem } from '@prisma/client';
import { BillWithItems } from 'src/common/types/api/bill/bill.types';
import {create} from 'zustand';


type State = {
    openBills: BillWithItems [],
    currBill: BillWithItems| null
}
type Actions = {
    updateBillList: (bills:State['openBills']) => void; 
    setCurrentBill: (bill: State['currBill']) => void;
}
export const useBillStore = create<State&Actions>((set) => ({
    openBills: [],
    currBill: null,
    updateBillList: ((bills) => set(()=>({openBills:bills}))),
    setCurrentBill: (bill => set(()=>({currBill:bill})))
}))