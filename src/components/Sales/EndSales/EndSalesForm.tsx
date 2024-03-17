import { DateTime } from "luxon";
import { ExpenseTable } from "../ExpenseTable.component";
import { SalesTable } from "../SalesTable.component";

export function EndSalesForm(props:{start:DateTime,end:DateTime}){
    return (
        <div className="flex flex-row gap-2">
        <div className="flex flex-col w-1/3 gap-2">
            <h3>Sales</h3>
            <SalesTable start={props.start.startOf('day')} end={props.end.endOf('day')} />
        </div>
        <div className="flex flex-col w-2/3 gap-2">
            <h3>Expenses</h3>
            <ExpenseTable start={props.start.startOf('day')} end={props.end.endOf('day')}/>
        </div>
    </div>
    )
}