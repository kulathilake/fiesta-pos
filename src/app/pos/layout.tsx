'use client'
import styles from './layout.module.css';
import Image from "next/image";
import { BillSideBarComponent } from "src/components/OpenBillsBar/BillSideBar.component";
import { useEffect, useState } from "react";
import { AuthAPIClient } from "src/libs/client/api/auth";
import { redirect } from "next/navigation";
import { Button, NextUIProvider, Spinner, useDisclosure } from "@nextui-org/react";
import { ItemBrowser } from "src/components/Items/ItemBrowser.component";
import { LoadingScreen } from "src/components/Screens/LoadingScreen";
import { NewItemModal } from "src/components/Items/NewItemModal";
import Link from "next/link";
import { useAuthStore } from "src/libs/client/store/auth.store";
import { DailyRecord, Role } from "@prisma/client";
import { SalesSummaryWidget } from "src/components/SalesSummaryWidget";
import { DateTime } from "luxon";
import { EndSalesModal } from "src/components/DailyRecord/EndSalesModal";
import { DailyRecordClient } from "src/libs/client/api/dailyrecord";
import { OpeningBalanceDialog } from 'src/components/DailyRecord/OpenningBalDlg';

export default function AppLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  const authStore = useAuthStore(state => state);
  const { isOpen: isNewItemOpen, onClose: newItemOnClose, onOpen: newItemOnOpen } = useDisclosure();
  const {isOpen: isEndSalesOpen, onClose: endSalesOnClose, onOpen: endSalesOnOpen} = useDisclosure();
  const [authCheckInProgress, setAuthCheckInProgress] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Daily Record
  const { isOpen: isOpeningBalanceOpen, onClose: openBalOnClose, onOpen: openBalOnOpen } = useDisclosure();
  const [record,setRecord] = useState<DailyRecord>();
  const [isDailyRecordLoading,setIsDailyRecordLoading] = useState(false);
  
  const checkDailyRecord = () => {
      setIsDailyRecordLoading(true);
      const date = DateTime.now().startOf("day").toJSDate()
      DailyRecordClient.getDailyRecord(date)
      .then(res=>{
        if(!res){
          openBalOnOpen();
        }else{
          setRecord({
            ...res,
            date: new Date(res.date),
            openingTime: new Date(res.openingTime)
          });
        }
      })
      .catch((e)=>{

      })
      .finally(()=>{
        setIsDailyRecordLoading(false)
      })
  }

  const openDailyRecord = async (openingBalance:number) => {
    const date = DateTime.now().startOf("day").toJSDate();
    return DailyRecordClient.openDailyRecord({
      date,
      openingCashBalance:openingBalance,
      openingTime: new Date(),
      openedBy: authStore.userId!
    })
    .then(res=>{
      setRecord({
        ...res,
        date: new Date(res.date),
        openingTime: new Date(res.openingTime)
      });
    })
    .catch(e=>{

    })
    .finally(()=>{

    })
  }

  useEffect(() => {
    const localToken = localStorage.getItem('0');
    const inMemoryToken = AuthAPIClient.getInstance().token;
    if (inMemoryToken) {
      setIsAuthorized(true);
      setAuthCheckInProgress(false);
    } else if (localToken) {
      AuthAPIClient.verifyLocalToken(localToken)
        .then(res => {
          setIsAuthorized(true);
          authStore.authorize(res.token, res.employee, res.role);
          setAuthCheckInProgress(false);
          checkDailyRecord();
        })
        .catch(() => {
          authStore.logout();
        })
    } else {
      setIsAuthorized(false)
      setAuthCheckInProgress(false);
    }

  }, []);

  useEffect(() => {
    if(isEndSalesOpen){
      checkDailyRecord()
    }
  }, [isEndSalesOpen])


  if (authCheckInProgress && !isAuthorized) {
    return <LoadingScreen />
  }
  if (!authCheckInProgress && !isAuthorized) {
    redirect('/auth/signin')
  }
  return (
    <NextUIProvider>
      <main className={`${styles.main} dark`} style={{
        background: "url('/app-bg.jpg')",
        backgroundSize: 'cover'
      }}>
        <div className={styles.header}>
          <div className="flex gap-4">
            <Button as={Link} href="/" className=" bg-slate-500 text-color-white">Home</Button>
            {/* <Button>Add Expense</Button> */}
            {authStore.role === Role.ADMIN &&
              <Button onClick={newItemOnOpen}>New Menu Item</Button>
            }
            <NewItemModal isOpen={isNewItemOpen} onClose={newItemOnClose} />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <div className='flex flex-col min-w-unit-sm'>
              <p>Daily Record</p>
              <div className="flex flex-row items-end gap-4">
                <p>{record?.date.toDateString()}</p>
                <p>From: {record?.openingTime.toLocaleTimeString()}</p>
                <Button size="sm" isIconOnly variant="flat" onClick={checkDailyRecord}>{isDailyRecordLoading ? <Spinner /> : "⟳"}</Button>
              </div>
            </div>
            <SalesSummaryWidget
              start={DateTime.now().startOf('day')}
              end={DateTime.now().endOf('day')}
            />
            <Button size="sm" variant="faded" className="font-bold" color="warning" onClick={endSalesOnOpen}>End Sales</Button>
            <Button size="sm" variant="faded" onClick={AuthAPIClient.logout}>Logout</Button>
            <Image
              src="/fiesta.png"
              alt="Fiesta Logo"
              className={styles.Logo}
              width={138.7}
              height={71.9}
              priority
            />
          </div>
        </div>
        <div className={`${styles.center}`}>
          <div className={styles.leftSideBar}>
            <BillSideBarComponent />
          </div>
          <div className={styles.itemSelection}>
            <ItemBrowser />
          </div>
          <div className={`${styles.bill} py-4`}>
            {children}
          </div>
        </div>
        <div className={styles.footer}></div>
      </main>
      <OpeningBalanceDialog 
        isOpen={isOpeningBalanceOpen} 
        onClose={openBalOnClose} 
        callback={openDailyRecord}/>
      <EndSalesModal isOpen={isEndSalesOpen} onClose={endSalesOnClose}/>
    </NextUIProvider>
  )
}
