import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { Expense, ExpenseType } from "@prisma/client"
import { DateTime } from "luxon";
import { useEffect, useState } from "react"
import { createExpenseRequestValidator } from "src/common/types/api/expense/expense.types";
import { ExpenseApiClient } from "src/libs/client/api/expense";
import { ZodError, ZodErrorMap, z } from "zod";

export function ExpenseTypeDropDown(props:{onChange:(type:ExpenseType)=>void, isInvalid:boolean}){
    return (
        <Select 
        isInvalid={props.isInvalid}
        label="Expense Category" onChange={(e)=>props.onChange(e.target.value as ExpenseType)}>
            {Object.keys(ExpenseType).map(type=>(
                <SelectItem className="capitalize" key={type} value={type}>{type}</SelectItem>
            ))}
        </Select>
    )
}
export function NewExpenseForm(props:{cb:()=>void}) {
    const [isLoading, setIsLoading] = useState(false);
    const [dateStr,setDateStr] = useState("");
    const [expense, setExpense] = useState<Partial<Expense>>({});
    const [errors,setErrors] = useState<{[name:string]:any}>({
        incurredOn: true,
        billId: true,
        type: true,
        amount: true,
        comment:true
    });

    const [shouldShowValidationErrors,setShouldShowValErrs] = useState(false);
    
    const handleCreateNewExpense = () => {
        const hasErrors = Object.values(errors).some(e=>e);
        if(hasErrors){
            setShouldShowValErrs(true);
        }
        if (!hasErrors) {
            setIsLoading(true);
            ExpenseApiClient.createExpense(expense)
                .then(res => {
                    props.cb();
                })
                .catch(e => {

                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    const handleChange = (key: string, value: string | number | DateTime) => {
        (expense as any)[key] = value;
        if(typeof value === 'string' && !value.length){
            (expense as any)[key] = undefined;
        }
        setExpense({...expense});
    }

    const handleDateChange = (value:string) => {
        setDateStr(value)
        const dateTime = DateTime.fromISO(value).set({
            hour: DateTime.now().hour,
            minute: DateTime.now().minute
        });
        if(dateTime.isValid){
            expense.incurredOn = dateTime.toJSDate();
        }else {
            expense.incurredOn = undefined;
        }
        setExpense({...expense})
    }

    useEffect(()=>{
        Object.entries(expense).map(([k,v])=>{
            console.log({k,v})
            errors[k] = typeof v === 'string' ? v.length===0 : v === undefined || v === 0 
        })
        setErrors({...errors})
    },[expense])

    return (
        <div className="flex flex-col gap-2">
                <Input label="Date" type="date"
                    isInvalid={shouldShowValidationErrors && errors["incurredOn"]}
                    value={dateStr}
                    onChange={(e) =>
                        handleDateChange(e.target.value)} />
                <Input 
                    isInvalid={shouldShowValidationErrors && errors["billId"]}
                    label="Bill Number" onChange={(e) =>
                    handleChange("billId", (e.target.value))} />
                <ExpenseTypeDropDown 
                    isInvalid={shouldShowValidationErrors && errors["type"]}
                onChange={(type=>handleChange('type',type))}/>
                <Input 
                    isInvalid={shouldShowValidationErrors && errors["amount"]}
                label="Amount" type="number" onChange={(e) =>
                    handleChange("amount", Number(e.target.value))} />
                <Input 
                    isInvalid={shouldShowValidationErrors && errors["comment"]}
                label="Comment" onChange={(e) =>
                    handleChange("comment", e.target.value)} />

                <Button
                    onClick={handleCreateNewExpense}
                    color="primary"
                    endContent={isLoading && <Spinner color="white" />}
                    className="my-4"
                >Save</Button>
        </div>
    )
}