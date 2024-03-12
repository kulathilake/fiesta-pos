import { Bill, BillItem, Employee, Role } from '@prisma/client';
import { BillWithItems } from 'src/common/types/api/bill/bill.types';
import {create} from 'zustand';


type State = {
    isAuthorized: boolean;
    token: string|null;
    userId: string | number | null;
    role: Role | null
}
type Actions = {
    authorize: (token:string,userId:string|number, role:Role)=>void,
    logout: ()=>void;
}
export const useAuthStore = create<State&Actions>((set) => ({
    isAuthorized: false,
    token: null,
    userId: null,
    role: null,
    authorize: (token,userId,role) => set(()=>{
        console.log(token,userId,role);
        return {
            isAuthorized: true,
            token: token,
            userId,
            role
    }}),
    logout: () => set(()=>({
        isAuthorized: false,
        token: null,
        userId: null,
        role: null
    }))
}))