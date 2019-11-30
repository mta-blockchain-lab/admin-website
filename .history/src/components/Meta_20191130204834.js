import Head from "next/head";

/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";
import { faintBlue } from "../styles/variables";

const Meta = () => (
  <div>
    <Head>
      <title>OpenCerts - Admin Panel</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        rel="icon"
        type="image/png"
        href="/static/images/favicon/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/images/favicon/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="
        https://cdn.jsdelivr.net/npm/react-toastify@4.5.2/dist/ReactToastify.min.css"
        rel="stylesheet"
        type="text/css"
      />
    </Head>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"
    />
    <Global
      styles={css`
        :root {
          font: "Source Sans Pro", sans-serif;
          --font-monospace: "Source Sans Pro", sans-serif;
          --font-monospace-size: 0.8rem !important;
          -webkit-font-smoothing: antialiased;
        }

        body {
          background: ${faintBlue};
          font-family: "Source Sans Pro", sans-serif;
          line-height: 1.5;
        }
      `}
    />
  </div>
);

export default Meta;
