import { useRouter } from "next/router";
import posts from "../../posts.json";

// our page content depends on external data
export async function getStaticProps(context) {
  console.log("@@@ file [id].js line 5 getStaticProps", context);
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  return {
    props: {
      data: posts,
    },
  };
}
// our page paths depends on external data
export async function getStaticPaths(context) {
  let postsData;
  try {
    const resp = await fetch("http://localhost:3000/api/posts");
    postsData = await resp.json();
  } catch (err) {
    console.error(err);
  }

  console.log("@@@ file [id].js line 18 getStaticPaths", context, postsData);

  return {
    paths: postsData
      ? Object.entries(postsData).map(([key, value]) => ({
          params: { id: key },
        }))
      : [{ params: { id: "test" } }, { params: { id: "second" } }],
    fallback: false,
  };
}

// Similar to getStaticProps, you export it from the page component file,
// and you return an object with a props object:
// The context object in this case will contain,
// in addition to the params object received also in getStaticProps, we’ll also receive:
// query: the query string of the URL
// req: the Node.js HTTP request object
// res: the Node.js HTTP response object

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

const dynamicPage = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  console.log("@@@ file [id].js line 7", router.pathname, router.asPath);
  const post = props.data[router.query.id];

  return (
    <div>
      <style jsx>{`
        div {
          background-color: rgb(148, 68, 68);
        }

        h1 {
          color: rgb(90, 143, 204);
        }
      `}</style>
      <h1>Blog post lalala</h1>
      {post && (
        <>
          <h3>Post title: {post.title}</h3>
          <p>Post content: {post.content}</p>
        </>
      )}
    </div>
  );
};

export default dynamicPage;
