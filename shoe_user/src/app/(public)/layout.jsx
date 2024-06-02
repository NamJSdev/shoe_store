import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";

// Import CSS files
import "../../../public/css/bootstrap.min.css";
import "../../../public/css/font-awesome.min.css";
import "../../../public/css/owl.carousel.css";
import "../../../public/css/owl.theme.css";
import "../../../public/css/owl.transitions.css";
import "../../../public/css/jquery-ui.css";
import "../../../public/css/meanmenu.min.css";
import "../../../public/lib/css/preview.css";
import "../../../public/css/animate.css";
import "../../../public/css/magic.css";
import "../../../public/css/normalize.css";
import "../../../public/lib/css/nivo-slider.css";
import "../../../public/css/main.css";
import "../../../public/css/style.css";
import "../../../public/css/responsive.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Home || James</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css?family=Norican"
          rel="stylesheet"
          type="text/css"
        />
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
        {/* Import JS files */}
        <Script src="/js/vendor/jquery-1.12.4.min.js" strategy="beforeInteractive" />
        <Script src="/lib/js/jquery.nivo.slider.js" strategy="lazyOnload" />
        <Script src="/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="/js/wow.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery-price-slider.js" strategy="lazyOnload" />
        <Script src="/lib/home.js" strategy="lazyOnload" />
        <Script src="/js/jquery.meanmenu.js" strategy="lazyOnload" />
        <Script src="/js/owl.carousel.min.js" strategy="lazyOnload" />
        <Script src="/js/jquery.elevatezoom.js" strategy="lazyOnload" />
        <Script src="/js/jquery.scrollUp.min.js" strategy="lazyOnload" />
        <Script src="/js/plugins.js" strategy="lazyOnload" />
        <Script src="/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
