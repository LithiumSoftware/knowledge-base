import App from "next/app";
import Head from "next/head";
import { withApollo } from "../lib/apollo";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./_theme";
import { CssBaseline } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

const MyApp = ({ Component, pageProps, router }) => {
  const getLayout = Component.getLayout || (page => page);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.syncfusion.com/ej2/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-richtexteditor/styles/material.css"
          rel="stylesheet"
        />
        <link
          href="//cdn.syncfusion.com/ej2/ej2-react-buttons/styles/material.css"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <DndProvider backend={Backend}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />, pageProps)}
        </DndProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default withApollo(MyApp);
