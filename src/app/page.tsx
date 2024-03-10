'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { config } from 'src/config/app.config'
import { useEffect, useState } from 'react'
import { AuthAPIClient } from 'src/libs/client/api/auth'
import { redirect } from 'next/navigation'
import { Button } from '@nextui-org/button'

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem('0');
    if (localToken) {
      AuthAPIClient.verifyLocalToken(localToken)
        .then(isValid => {
          setIsAuthorized(isValid);
        })
    }
  }, []);

  const handlePosClick = () => {
    redirect('/pos')
  }

  const handleMenuClick = () => {
    redirect('/menu')
  }

  return (
    <>
      <video src='bg.mp4' autoPlay muted loop className={styles.video}>
        Your browser does not support HTML5 video.
      </video>
      <main className={styles.main}>
        {<div className={styles.description}>
          {isAuthorized ? <p>Welcome to Fiesta</p> : <p>
            Get started by <Link href={"/auth/signin"}>signing in</Link>
          </p>}
          <div>
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
        {isAuthorized && (
          <div className='flex gap-4 flex-col'>
            <Button onClick={handlePosClick} color='primary'>Point of Sales</Button>
            <Button onClick={handleMenuClick} color='secondary'>Menu Editor</Button>
            <Button color="secondary">Inventory Management</Button>
            <Button color='secondary'>Analytics</Button>
          </div>
        )}
        <div >
          <h1 className='text-2xl'>Fiesta Urban Cuisine</h1>
          <h3>
            Point of Sales & Daily Operations Management System
          </h3>
          <small>Version {config.app_ver}</small>
        </div>

      </main>
    </>

  )
}
