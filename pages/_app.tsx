import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import siteConfig from "../site.config";
import "../styles/globals.scss";
import { Provider } from "react-redux/es/exports";
import { store } from "../context/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DefaultSeo {...siteConfig.seo} /> <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
