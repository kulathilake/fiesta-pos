/**
 * Sales Table
 */

import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { SalesApiClient } from "src/libs/client/api/sales";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function ExpenseTable(props: { start: DateTime, end: DateTime }) {
    const [isLoading,setIsLoading] = useState(true);
    const [rows, setRows] = useState<{key:string, label:string, value:string}[]>([]);

    const columns = [
        {
            key: "bill",
            label: "Bill"
        },
        {
            key: "description",
            label: "Description"
        },
        {
            key: "value",
            label: "Amount"
        }
    ]
    useEffect(() => {
        setIsLoading(false)
    }, [props]);

    if(isLoading){
       return <div className="flex justify-center">
        <Spinner label="Loading Expenses"/>
        </div>
    }
    return (
        <div className="flex flex-col gap-2">
            <Table>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => {
                        if(item.label==="TOTAL"){
                            return (
                                <TableRow>
                                    <TableCell 
                                        className="font-extrabold text-green-300">Total</TableCell>
                                    <TableCell 
                                        className="font-extrabold text-green-300">{item.value}</TableCell>
                                </TableRow>
                            )
                        }
                        return (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}}
                </TableBody>
            </Table>
        </div>

    )
}