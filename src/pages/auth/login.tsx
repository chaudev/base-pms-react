import Head from "next/head";
import { NextPage } from "next/types";
import React, { Fragment } from "react";
import FormLogin from "~src/components/screen/Auth/FormLogin";
import { config } from "~src/config/appConfig";

const Login: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Copyright © Phuc 2020</title>
      </Head>
      <FormLogin />
    </Fragment>
  );
};

export default Login;
