'use client'
import { AuthAPIClient } from "src/libs/client/api/auth"

export default function SignIn(){
    const handleRequestOtpClick = async () => {
        try {
            const otpRequest = (await AuthAPIClient.requestOtp("KRK001","0773121022"))         
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <button onClick={handleRequestOtpClick}>sign in</button>
        </main>
    )
}