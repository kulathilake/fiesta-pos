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
import { LoadingScreen } from "src/components/Screens/LoadingScreen";

const inter = Inter({ subsets: ['latin'] })

export default function AppLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: any
}) {
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
        .then(isValid => {
          setIsAuthorized(true);
          setAuthCheckInProgress(false)
        })
    } else {
      setIsAuthorized(false)
      setAuthCheckInProgress(false);
    }

  }, []);


  if (authCheckInProgress && !isAuthorized) {
    return <LoadingScreen/>
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
      </main>
    </NextUIProvider>
  )
}
