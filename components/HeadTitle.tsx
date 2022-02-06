import Head from "next/head";
const HeadTitle = ({ title = "Next-Forum" }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,height=device-height, initial-scale=1,user-scalable=no"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default HeadTitle;
