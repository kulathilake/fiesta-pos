import { Bill, BillItem, Employee } from '@prisma/client';
import { BillWithItems } from 'src/common/types/api/bill/bill.types';
import {create} from 'zustand';


type State = {
    isAuthorized: boolean;
    token: string|null;
    user: Employee|null;
}
type Actions = {
    authorize: (token:string,user:Employee)=>void,
    logout: ()=>void;
}
export const useAuthStore = create<State&Actions>((set) => ({
    isAuthorized: false,
    token: null,
    user: null,
    authorize: (token,user) => set(()=>({
        isAuthorized: true,
        token: token,
        user
    })),
    logout: () => set(()=>({
        isAuthorized: false,
        token: null,
        user: null
    }))
}))