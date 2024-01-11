'use client'
import Image from 'next/image'
import { AuthAPIClient } from "src/libs/client/api/auth";
import styles from "./page.module.css";
import Link from 'next/link';
import { FormEventHandler, useState } from 'react';
import { OTPRequestResponse } from 'src/common/types/api/auth/auth.types';
import { OTP_ERRORS } from 'src/common/errors/otp.errors';

export default function SignIn() {
    const [otpReqRes, setOtpReqRes] = useState<OTPRequestResponse>();

    const handleRequestOtpClick: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const id = Number(data.get('employee-id'));
        const mobile = Number("94" + data.get('employee-mobile'));
        const pin = data.get('employee-pin') as string;
        try {
            const otpRequest = (await AuthAPIClient.requestOtp(id, mobile, pin));

            setOtpReqRes(otpRequest);
        } catch (error) {
            console.log(error)
            switch ((error as any).message as OTP_ERRORS) {
                case OTP_ERRORS.INVALID_EMPID_PIN_MOBILE_COMB_ERROR:
                    alert("Invalid Employee PIN or Mobile Number");
                    break;
                case OTP_ERRORS.INVALID_PAYLOAD_ERROR:
                case OTP_ERRORS.TRANSPORT_ERROR:
                default:
                    alert("Something went wrong!");
                    break;
            }
        }
    }

    return (
        <main className={styles.main}>
            <video autoPlay muted loop className={styles.video}>
                <source src="/bg.mp4" type="video/mp4" />
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
                {!!!otpReqRes ?
                    <form id="sign-form-1" onSubmit={handleRequestOtpClick}>
                        <label htmlFor='employee-id'>Employee ID</label>
                        <input className={styles.input} type="number" name="employee-id" required />
                        <label htmlFor='employee-pin'>Employee PIN</label>
                        <input className={styles.input} type='number' name="employee-pin" required />
                        <label htmlFor='employee-mobile'>Employee Mobile Number</label>
                        <input className={styles.input} type='tel' name="employee-mobile" required />
                        <button className={styles.button} type="submit">Sign in</button>
                    </form> :
                    <form id="opt-form">
                        <label htmlFor='otp'>OTP</label>
                        <input className={styles.input} type='number' name="employee-otp" />
                        <button className={styles.button} type="submit">Verify</button>

                    </form>
                }

            </div>
        </main>
    )
}