import Head from "next/head";
import Header from "../components/Header";
import Home from "../components/Home";
import HomeContextProvider from "../context/home.context";

export default function SSR() {
  return (
    <div>
      <Head>
        <title>Float Inc</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <HomeContextProvider>
          <Home />
        </HomeContextProvider>
      </main>
    </div>
  );
}
