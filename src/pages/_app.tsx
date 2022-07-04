import "../../styles/globals.css";
import { TAppPropsWithLayout } from "~src/types/layout";
import { QueryClientProvider, QueryClient } from "react-query";
import Router from "next/router";
import NProgress from "nprogress";
import { AppProps } from "next/app";
import React, { FC, Fragment, useState } from "react";
import ToastProvider from "../providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ConfigProvider } from "antd";
import "react-toastify/dist/ReactToastify.min.css";

import "nprogress/nprogress.css";

import "moment/locale/en-in";
import locale from "antd/lib/locale/vi_VN";

//Add style
import "../../styles/globals.css";
import "../../styles/styles.css";
import "antd/dist/antd.css";

//add style icon
import "../assets/fontawesome/css/all.min.css";

// Add signalr
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import BlankLayout from "../components/global/Layout/blankLayouts";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: TAppPropsWithLayout) => {
  const Layout = Component.Layout || BlankLayout;
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState<HubConnection>();

  React.useEffect(() => {
    (async () => {
      let connection = new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs`)
        .withAutomaticReconnect()
        .build();

      // console.log(connection);

      if (connection && pageProps.user) {
        const { user } = pageProps;
        console.log({ user });
        setConnection(connection);
        connection
          .start()
          .then(() => {
            connection.invoke(
              "join",
              JSON.stringify(user.UserId),
              JSON.stringify(user.UserGroupId)
            );
          })
          .catch((err) => console.log(err));
      }
    })();
  }, []);

  React.useEffect(() => {
    const handleRouteStart = () => {
      setLoading(true);
      NProgress.start();
    };
    const handleRouteDone = () => {
      setLoading(false);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.on("routeChangeStart", handleRouteStart);
      Router.events.on("routeChangeComplete", handleRouteDone);
      Router.events.on("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <ToastProvider>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider locale={locale}>
            <Head>
              <link rel="icon" type="image/png" href="/logo.png" />
              <title>
                {!loading ? "PMS Mona-Media" : "Đang chuyển hướng..."}
              </title>
            </Head>

            {
              <Layout connection={connection}>
                <Component {...pageProps} connection={connection} />
              </Layout>
            }
            <ToastContainer />
          </ConfigProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ToastProvider>
  );
};

export default App;
