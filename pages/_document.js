import { Html, Head, Main, NextScript } from 'next/document'
import useWindowDimensions from "../Hooks/useWindowsDimensions";

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="stylesheet" href="/Bootstrap/bootstrap.min.css"/>
      </Head>
          <body>
                <div id="PopUpBase"/>
                <div id="CatalogSpace"/>
                <div id="FeedBackList"/>
                <Main />
                <NextScript />
          </body>
    </Html>
  )
}