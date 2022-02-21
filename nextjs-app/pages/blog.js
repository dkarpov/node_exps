import posts from "../posts.json";
import Link from "../components/Link";
import styles from "../styles/Blog.module.css";

const Blog = () => {
  return (
    <div className={styles.blog}>
      <h1>Blog</h1>

      <ul>
        {Object.entries(posts).map((value, index) => {
          return (
            <li key={index}>
              <Link href="/blog/[id]" as={"/blog/" + value[0]}>
                <a>{value[1].title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
