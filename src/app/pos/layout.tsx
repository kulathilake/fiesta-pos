'use client'
import { Inter } from "next/font/google"
import styles from './layout.module.css';
import Image from "next/image";
import { BillSideBarComponent } from "src/components/OpenBillsBar/BillSideBar.component";
import { useEffect, useState } from "react";
import { AuthAPIClient } from "src/libs/client/api/auth";
import { redirect } from "next/navigation";
import { Button, NextUIProvider, useDisclosure } from "@nextui-org/react";
import { ItemBrowser } from "src/components/Items/ItemBrowser.component";
import { LoadingScreen } from "src/components/Screens/LoadingScreen";
import { NewItemModal } from "src/components/Items/NewItemModal";
import Link from "next/link";
import { useAuthStore } from "src/libs/client/store/auth.store";
import { Role } from "@prisma/client";
import { SalesSummaryWidget } from "src/components/SalesSummaryWidget";
import { DateTime } from "luxon";

const inter = Inter({ subsets: ['latin'] })

export default function AppLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  const authStore = useAuthStore(state => state);
  const { isOpen: isNewItemOpen, onClose: newItemOnClose, onOpen: newItemOnOpen } = useDisclosure();
  const [authCheckInProgress, setAuthCheckInProgress] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
          setAuthCheckInProgress(false)
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
    console.log(authStore.isAuthorized)
  }, [authStore])


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
            <Button>Add Expense</Button>
            {authStore.role === Role.ADMIN &&
              <Button onClick={newItemOnOpen}>New Menu Item</Button>
            }
            <NewItemModal isOpen={isNewItemOpen} onClose={newItemOnClose} />
          </div>
          <div className="flex flex-row gap-4 items-center">
            <SalesSummaryWidget
              start={DateTime.now().startOf('day')}
              end={DateTime.now().endOf('day')}
            />
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

    </NextUIProvider>
  )
}
