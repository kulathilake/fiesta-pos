/**
 * Sales Table
 */

import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { ExpenseApiClient } from "src/libs/client/api/expense";
import { formatNumberToCurrency } from "src/libs/utils/currency";

const MAX_PER_PAGE = 10;

export function ExpenseTable(props: { start: DateTime, end: DateTime, totalCallback: (t:number)=>void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<{ bill: string, comment: string, value: string }[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);

    const columns = [
        {
            key: "bill",
            label: "Bill"
        },
        {
            key: "comment",
            label: "Comment"
        },
        {
            key: "value",
            label: "Amount"
        }
    ]
    useEffect(() => {
        setIsLoading(true)
        ExpenseApiClient.getExpenses(props.start.toJSDate(), props.end.toJSDate())
            .then(res => {
                const newRows: typeof rows = [];
                res.forEach((exp => {
                    newRows.push({
                        bill: exp.billId,
                        comment: exp.comment,
                        value: formatNumberToCurrency(exp.amount)
                    })
                }));
                const total = res.reduce((p: any, c) => (p + c.amount), 0);
                props.totalCallback(total);
                newRows.push({
                    bill: "",
                    comment: "TOTAL",
                    value: formatNumberToCurrency(total)
                })
                setRows(newRows);
                setPages(Math.ceil(newRows.length / MAX_PER_PAGE));
            })
            .catch(e => {

            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [props.end]);

    if (isLoading) {
        return <div className="flex justify-center">
            <Spinner label="Loading Expenses" />
        </div>
    }
    return (
        <div className="flex flex-col gap-2">
            <Table
                bottomContent={
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                size="sm"
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    </div>

                }
                bottomContentPlacement="outside"
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows}>
                    {(item) => {
                        if (item.comment === "TOTAL") {
                            return (
                                <TableRow key={item.bill} className="bg-white">
                                    <TableCell
                                        className="font-extrabold text-red-500">Total</TableCell>
                                    <TableCell>{""}</TableCell>
                                    <TableCell
                                        className="font-extrabold text-red-500">{item.value}</TableCell>
                                </TableRow>
                            )
                        }
                        return (
                            <TableRow key={item.bill}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )
                    }}
                </TableBody>
            </Table>
        </div>

    )
}