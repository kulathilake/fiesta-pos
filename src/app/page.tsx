'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { config } from 'src/config/app.config'
import { useEffect, useState } from 'react'
import { AuthAPIClient } from 'src/libs/client/api/auth'
import { Button,Link } from '@nextui-org/react'
import { LoadingScreen } from 'src/components/Screens/LoadingScreen'
import { useAuthStore } from 'src/libs/client/store/auth.store'
import { Role } from '@prisma/client'

export default function Home() {
  const authStore = useAuthStore(state=>state);
  const [isCheckingAuth,setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem('0');
    if (localToken) {
      setIsCheckingAuth(true);
      AuthAPIClient.verifyLocalToken(localToken)
        .then(res => {
          authStore.authorize(res.token, res.employee, res.role);
        })
        .catch(()=>{
          authStore.logout();
        })
        .finally(()=>{
          setIsCheckingAuth(false)
        })
    }else{
      setIsCheckingAuth(false);
    }
  }, []);


  if(isCheckingAuth){
    return <LoadingScreen/>
  }

  return (
    <>
      <video src='bg.mp4' autoPlay muted loop className={styles.video}>
        Your browser does not support HTML5 video.
      </video>
      <main className={styles.main}>
        {<div className={styles.description}>
          {authStore.isAuthorized ? <p>Welcome to Fiesta</p> : <p>
            Get started by <Link href={"/auth/signin"}>signing in</Link>
          </p>}
          <div className='flex flex-row gap-4 items-center'>
            {authStore.isAuthorized && <Button size="sm" variant="faded" onClick={AuthAPIClient.logout}>Logout</Button>}
            <a
              href="https://www.fiesta.lk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/fiesta.png"
                alt="Fiesta Logo"
                className={styles.Logo}
                width={138.7}
                height={71.9}
                priority
              />
            </a>
          </div>
        </div>}
        {authStore.isAuthorized && (
          <div className='flex gap-4 flex-col'>
            <Button as={Link} href="/pos" color='primary'>Point of Sales</Button>
            <Button as={Link} href="/inventory" color='primary'>Inventory Management</Button>
            {authStore.role === Role.ADMIN && <>
              <Button as={Link} href="/menu" color='secondary'>Menu Editor</Button>
              <Button as={Link} href='/dashboard' color='secondary'>Management Dashboard</Button>
            </>}
          </div>
        )}
        <div >
          <h1 className='text-2xl'>Fiesta Urban Cuisine</h1>
          <h3>
            Point of Sales System & Operations Command Center
          </h3>
          <small>Version {config.app_ver}</small>
        </div>

      </main>
    </>

  )
}
