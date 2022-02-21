import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Index = () => (
  <div className={styles.home}>
    <style jsx>{`
      // overrides styles from Home.module.css
      h1 {
        font-size: 12 rem;
        color: #fff000;
      }
    `}</style>
    <Head>
      <title>Header is here</title>{" "}
      {/* issue was found with rendering title in head 
      https://github.com/vercel/next.js/issues/4596 */}
      <meta property="og:title" content="Main page title" key="title" />
      <p>Header</p>
    </Head>
    <h1>Home page!</h1>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </div>
);

export default Index;
