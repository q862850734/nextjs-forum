import Head from "next/head";
export default function HeadTitle({ title = "Next-Forum" }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1,user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
