import { Bill, BillItem, KitchenTicket } from '@prisma/client';
import { BillItemWithItem, BillWithItems } from 'src/common/types/api/bill/bill.types';
import { KOTWithItems } from 'src/common/types/api/bill/kot.types';
import {create} from 'zustand';


type State = {
    currBillTickets: KOTWithItems[] 
}
type Actions = {
    setCurrentBillTickets: (tickets: State['currBillTickets']) => void;
}
export const useTicketStore = create<State&Actions>((set) => ({
    currBillTickets: [],
    setCurrentBillTickets: (tickets => set(()=>({currBillTickets:tickets})))
}))