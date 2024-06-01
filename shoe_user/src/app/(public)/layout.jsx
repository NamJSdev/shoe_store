'use client'
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";

// Import CSS files
import "../../../public/css/bootstrap.min.css";
import "../../../public/css/font-awesome.min.css";
import "../../../public/css/owl.carousel.css";
import "../../../public/css/owl.theme.css";
import "../../../public/css/owl.transitions.css";
import "../../../public/css/jquery-ui.css";
import "../../../public/css/meanmenu.min.css";
import "../../../public/lib/css/nivo-slider.css";
import "../../../public/lib/css/preview.css";
import "../../../public/css/animate.css";
import "../../../public/css/magic.css";
import "../../../public/css/normalize.css";
import "../../../public/css/main.css";
import "../../../public/css/style.css";
import "../../../public/css/responsive.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    const jquery = document.createElement('script');
    const bootstrap = document.createElement('script');
    const js3 = document.createElement('script');
    const js4 = document.createElement('script');
    const js5 = document.createElement('script');
    const js6 = document.createElement('script');
    const js7 = document.createElement('script');
    const js8 = document.createElement('script');
    const js9 = document.createElement('script');
    const js10 = document.createElement('script');
    const js11 = document.createElement('script');
    const js12 = document.createElement('script');
    const js13 = document.createElement('script');

    jquery.src = "/js/vendor/jquery-1.12.4.min.js";
    jquery.async = true;
    bootstrap.src = "/js/bootstrap.min.js";
    bootstrap.async = true;
    js3.src = "/js/wow.min.js";
    js4.async = true;
    js5.src = "/js/jquery-price-slider.js";
    js5.async = true;
    js6.src = "/lib/js/jquery.nivo.slider.js";
    js6.async = true;
    js7.src = "/lib/home.js";
    js7.async = true;
    js8.src = "/js/jquery.meanmenu.js";
    js8.async = true;
    js9.src = "/js/owl.carousel.min.js";
    js9.async = true;
    js10.src = "/js/jquery.elevatezoom.js";
    js10.async = true;
    js11.src = "/js/jquery.scrollUp.min.js";
    js11.async = true;
    js12.src = "/js/plugins.js";
    js12.async = true;
    js13.src = "/js/main.js";
    js13.async = true;

    document.body.appendChild(jquery);
    document.body.appendChild(bootstrap);
    document.body.appendChild(js3);
    document.body.appendChild(js4);
    document.body.appendChild(js5);
    document.body.appendChild(js6);
    document.body.appendChild(js7);
    document.body.appendChild(js8);
    document.body.appendChild(js9);
    document.body.appendChild(js10);
    document.body.appendChild(js11);
    document.body.appendChild(js12);
    document.body.appendChild(js13);

    return () => {
      document.body.removeChild(jquery);
      document.body.removeChild(bootstrap);
      document.body.removeChild(js3);
      document.body.removeChild(js4);
      document.body.removeChild(js5);
      document.body.removeChild(js6);
      document.body.removeChild(js7);
      document.body.removeChild(js8);
      document.body.removeChild(js9);
      document.body.removeChild(js10);
      document.body.removeChild(js11);
      document.body.removeChild(js12);
      document.body.removeChild(js13);
    }
  }, []);
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Home || James</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />

        <link href="https://fonts.googleapis.com/css?family=Norican" rel="stylesheet" type="text/css" />
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
