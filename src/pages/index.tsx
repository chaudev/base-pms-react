/* eslint-disable react/no-children-prop */
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { TNextPageWithLayout } from "../types/layout";
import { MainLayout } from "~src/components";
import { GetServerSideProps } from "next";
import ContactCustomerTable from "~src/components/screen/contact/contact-customer/ContactCustomerTable";
// import "@fortawesome/fontawesome-free/css/all";
const Home: TNextPageWithLayout = () => {
  return (
    <>
      <div className="text-center font-semibold">PMS MONAMEDIA</div>
    </>
  );
};

Home.Layout = MainLayout;
export default Home;
