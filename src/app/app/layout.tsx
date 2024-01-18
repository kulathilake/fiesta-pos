'use client'
import { Inter } from "next/font/google"
import styles from './layout.module.css';
import Image from "next/image";
import { BillSideBarComponent } from "src/components/OpenBillsBar/BillSideBar.component";
import { useEffect, useState } from "react";
import { AuthAPIClient } from "src/libs/client/api/auth";
import { redirect } from "next/navigation";
import { Button, NextUIProvider } from "@nextui-org/react";
import { ItemBrowser } from "src/components/Items/ItemBrowser.component";

const inter = Inter({ subsets: ['latin'] })

export default function AppLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
  const [authCheckInProgress,setAuthCheckInProgress] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(()=>{
    const localToken = localStorage.getItem('0');
    const inMemoryToken = AuthAPIClient.getInstance().token;
    if(inMemoryToken) {
      setIsAuthorized(true);
      setAuthCheckInProgress(false);
    }else if (localToken) {
      AuthAPIClient.verifyLocalToken(localToken)
        .then(isValid => {
          setIsAuthorized(isValid);
          setAuthCheckInProgress(false)
        })
    } else {
      setIsAuthorized(false)
      setAuthCheckInProgress(false);
    }

  },[]);


  if(authCheckInProgress && !isAuthorized) {
    return <p>loading...</p>
  }
  if(!authCheckInProgress && !isAuthorized) {
    redirect('/auth/signin')
  }
  return (
      <NextUIProvider>
        <main className={`${styles.main} dark`} style={{ 
            background: "url('/app-bg.jpg')",
            backgroundSize: 'cover'
          }}>
          <div className={styles.header}>
            <div>
              <Button  className="mx-unit-1 bg-black text-color-white">🔒 Lock</Button>
              <Button className="mx-unit-1 bg-black text-color-white">↩️ Logout</Button>
            </div>
            <Image
              src="/fiesta.png"
              alt="Fiesta Logo"
              className={styles.Logo}
              width={138.7}
              height={71.9}
              priority
            />
          </div>
          <div className={styles.center}>
            <div className={styles.leftSideBar}>
              <BillSideBarComponent/>
            </div>
            <div className={styles.itemSelection}>
              <ItemBrowser/>
            </div>
            <div className={`${styles.bill}`}>
              {children}
            </div>
          </div>
          <div className={styles.footer}></div>
        </main>

      </NextUIProvider>
  )
}
