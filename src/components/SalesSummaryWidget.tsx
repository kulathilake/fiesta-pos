/**
 * Simple Sales Display Widget
 */

import { Button, Spinner, Tooltip } from "@nextui-org/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { GetSalesSummaryResponse } from "src/common/types/api/sales/sales.types";
import { SalesApiClient } from "src/libs/client/api/sales";
import { useBillStore } from "src/libs/client/store/bill.store";
import { formatNumberToCurrency } from "src/libs/utils/currency";

export function SalesSummaryWidget(props: { start: DateTime, end: DateTime }) {
    const billStore = useBillStore(s => s);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [sales, setSales] = useState<GetSalesSummaryResponse>();

    const fetchSales = () => {
        setIsLoading(true)
        SalesApiClient.getPosSalesSummary(props.start.toISO()!, props.end.toISO()!)
            .then(res => {
                setSales(res);
            })
            .catch(e => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchSales();
    }, [billStore])

    return (
        <div className="flex flex-col min-w-unit-sm">
            <p>Sales Summary</p>
            <div className="flex flex-row items-end gap-4">
                {(sales && !hasError) && (
                    <Tooltip content={
                        <div>
                            <div className="flex flex-row gap-3">
                                <div className="flex-col text-green-400">
                                    <small>Finalized Sales</small>
                                    <p>{formatNumberToCurrency(sales.finalizedSales)}</p>
                                </div>
                                <div className="flex-col">
                                    <small>Pending Sales</small>
                                    <p>{formatNumberToCurrency(sales.pendingSales)}</p>
                                </div>
                                <div className="flex-col">
                                    <small>Total Sales</small>
                                    <p>{formatNumberToCurrency(sales.total)}</p>
                                </div>
                            </div>
                            <div className="text-xs text-center">
                                {props.start.toISODate() === props.end.toISODate() ? props.end.toISODate() :
                                    props.start.toISODate() + " to " + props.end.toISODate()
                                }
                            </div>
                        </div>}>

                        <div className="flex gap-2">
                            <div className="text-green-400">
                                <p>{formatNumberToCurrency(sales.finalizedSales)}</p>
                            </div>
                        </div>
                    </Tooltip>)}
                {(!isLoading && hasError) && (
                    <div>
                        Error getting sales
                    </div>
                )}
                <Tooltip content="Reload data">
                    <Button size="sm" isIconOnly variant="flat" onClick={fetchSales}>{isLoading ? <Spinner /> : "⟳"}</Button>
                </Tooltip>
            </div>
        </div>
    )
}