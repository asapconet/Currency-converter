import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import siteConfig from "../site.config";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...siteConfig.seo} /> <Component {...pageProps} />
    </>
  );
}

export default MyApp;
