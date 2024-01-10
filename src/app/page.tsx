import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { config } from 'src/config/app.config'

export default function Home() {
  return (
    <>
      <video autoPlay muted loop className={styles.video}>
        <source src="bg.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by <Link href={"/auth/signin"}>signing in</Link>
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

        <div className={styles.center}>

        </div>

        <div className={styles.grid}>
          {config.external_links.map((link)=>(
            <a
            key={link.url}
            href={link.url}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              {link.title} <span>-&gt;</span>
            </h2>
            <p>{link.description}</p>
          </a>
          ))}
        </div>

      </main>
    </>

  )
}
