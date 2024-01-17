import { DateTime } from "luxon";

export function billIdGenerator(prevBillDate: DateTime, prevBillId: string) {
    let sequence = +prevBillId || 0;
    let lastDay = DateTime.now();

    if( prevBillDate && lastDay.startOf('day').equals(prevBillDate.startOf('day'))){
        sequence += 1;
    }else {
        sequence = 1;
    }

    const maxDigits = 3;
    return {
        id: (DateTime.now().startOf('day').toUnixInteger() + String(sequence).padStart(maxDigits,"0")),
        visibleId: String(sequence).padStart(maxDigits,"0")
    }
}