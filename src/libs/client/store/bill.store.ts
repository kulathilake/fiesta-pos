import { set } from 'zod';
import {create} from 'zustand';

const useStore = create((set) => ({
    openBills: [],
    activeBill: null,
}))