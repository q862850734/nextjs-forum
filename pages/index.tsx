import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SignUp from "../components/SignUp";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>首页</h1>
    </Layout>
  );
};

export default Home;
