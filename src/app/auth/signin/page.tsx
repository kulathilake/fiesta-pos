'use client'
import Image from 'next/image'
import { AuthAPIClient } from "src/libs/client/api/auth";
import styles from "./page.module.css";
import Link from 'next/link';
import { FormEventHandler, useEffect, useState } from 'react';
import { OTP_ERRORS, TOKEN_ISSUE_ERRORS } from 'src/common/errors/auth.errors';
import { redirect } from 'next/navigation';

export default function SignIn() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(()=>{
        if(isAuthorized){
            redirect('/pos')
        }
    },[isAuthorized])

    const handleTokenRequestClick: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const id = Number(data.get('employee-id'));
        const pin = data.get('employee-pin') as string;
        try {
            
            const tokenReq = (await AuthAPIClient.requestToken(id,pin));
            setIsAuthorized(!!tokenReq)
        } catch (error) {
            switch((error as any).message as TOKEN_ISSUE_ERRORS){
                case TOKEN_ISSUE_ERRORS.INVALID_PIN_ERROR:
                    alert("Invalid PIN");
                    break;
                case TOKEN_ISSUE_ERRORS.INVALID_PAYLOAD_ERROR:
                default:
                    alert("Something went wrong");
            }
        }

    }

    return (
        <main className={styles.main}>
            <video autoPlay muted loop className={styles.video}>
                <source src="/bg.mp4" type="/video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div className={styles.description}>
                <p>
                    <Link href={"/"}> <span></span>← Back</Link>
                </p>
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
            </div>
            {/* Sign in forms */}
            <div className={styles.center}>
                <h1>Sign in to Fiesta POS</h1>
                    <form id="sign-form-1" onSubmit={handleTokenRequestClick}>
                        <label htmlFor='employee-id'>Employee ID</label>
                        <input className={styles.input} type="number" name="employee-id" required />
                        <label htmlFor='employee-pin'>Employee PIN</label>
                        <input className={styles.input} type='number' name="employee-pin" required />
                        <button className={styles.button} type="submit">Sign in</button>
                    </form> 
            </div>
        </main>
    )
}