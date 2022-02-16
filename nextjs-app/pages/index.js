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
    <h1>Home page</h1>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </div>
);

export default Index;
