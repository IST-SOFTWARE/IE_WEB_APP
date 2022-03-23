import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="stylesheet" href="/Bootstrap/bootstrap-grid.min.css"/>
      </Head>
      <body>
        <div id="PopUpBase"/>
        <div id="CatalogSpace"/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}