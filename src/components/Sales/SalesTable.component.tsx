/**
 * Sales Table
 */

import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { SalesApiClient } from "src/libs/client/api/sales";
import { formatNumberToCurrency } from "src/libs/utils/currency";

const MAX_PER_PAGE = 10;

export function SalesTable(props: { start: DateTime, end: DateTime, totalCallback: (t:number)=>void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState<{ key: string, label: string, value: string }[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);

    const columns = [
        {
            key: "label",
            label: "Invoice"
        },
        {
            key: "value",
            label: "Amount"
        }
    ]
    useEffect(() => {
        console.log(props);
        SalesApiClient.getPosSales(
            props.start.toISO()!,
            props.end.toISO()!
        )
            .then(res => {
                const rows_ = res.sales.map((sale, k) => ({
                    key: `${k}`,
                    label: sale.billId,
                    value: formatNumberToCurrency(sale.total)
                }));
                rows_.push({
                    key: "",
                    label: "TOTAL",
                    value: formatNumberToCurrency(res.total)
                })
                setRows(rows_);
                props.totalCallback(res.total);
                setPages(Math.ceil(rows_.length / MAX_PER_PAGE));
            })
            .catch(() => {

            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [props])
    return (
        <div className="flex flex-col gap-2">
            <Table
                isHeaderSticky
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
                bottomContentPlacement="outside">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows} isLoading={isLoading}>
                    {(item) => {
                        if (item.label === "TOTAL") {
                            return (
                                <TableRow className="bg-white">
                                    <TableCell
                                        className="font-extrabold text-green-500">Total</TableCell>
                                    <TableCell
                                        className="font-extrabold text-green-500">{item.value}</TableCell>
                                </TableRow>
                            )
                        }
                        return (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )
                    }}
                </TableBody>
            </Table>
        </div>

    )
}