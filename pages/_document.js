import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>

        <link rel="stylesheet" href="/Bootstrap/bootstrap.min.css"/>

        <link rel="icon" type="image/png" sizes="32x32" href="/Meta/favicon32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/Meta/favicon.ico"/>

        <link rel="apple-touch-icon" sizes="180x180"  href="/Meta/apple-touch-icon.png"/>
        <link rel="manifest"  href="/Meta/site.webmanifest"/>

        <link rel="mask-icon"  href="/Meta/safari-pinned-tab.svg" color="#2c3641"/>
        <meta name="msapplication-TileColor" content="#4d7bae"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
          <body id={"APP_BODY_WRAPPER"}>
                <div id="LoadingSpace"  style={{zIndex: "40"}}/>
                <div id="PopUpBase"     style={{zIndex: "30"}}/>
                <div id="CatalogSpace"  style={{zIndex: "20"}}/>
                {/* <div id="FeedBackList"  style={{zIndex: "10"}}/> */}
                <Main />
                <NextScript />
          </body>
    </Html>
  )
}