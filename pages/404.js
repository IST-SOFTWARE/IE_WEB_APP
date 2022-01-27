import Image from 'next/image'
import styles from '../styles/nf_error.module.css'
import Link from 'next/link'

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export default function ErrorPage(){
    
    return(
        <>
        <Image src="/404_bg.png"
        className = {styles.backImg}
        layout='fill'
        objectFit='cover'
        quality={100}
        alt='Background'
        placeholder="blur"
        blurDataURL={rgbDataURL(44, 54, 65)}
        />

        <div className={styles.container}>
            <div className={styles.logoBlock}>
                <Link href="/">
                    <Image
                    src='/w_logo_svg.svg'
                    alt="Logo"
                    layout='intrinsic'
                    width={223.63}
                    height={66.16}
                    />
                </Link>
            </div>

            <div className={styles.errorBlock}>
                <div className={styles.errorMsg}>
                    <h1>404</h1>
                    <div className={styles.vl}></div>
                    <h2>Страница не<br/>найдена</h2>
                </div>
                <p>Такой страницы у нас на сайте нет :(<br/>
                <Link href="/"><a>Вернуться на главную</a></Link></p>
            </div>
        </div>
        </>
    )
}