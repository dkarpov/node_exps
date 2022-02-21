import { useRouter } from "next/router";
import posts from "../../posts.json";

export async function getStaticProps(context) {
  console.log("@@@ file [id].js line 5", context);

  return {
    props: {
      data: posts,
    },
  };
}

export async function getStaticPaths(context) {
  console.log("@@@ file [id].js line 15", context);

  return {
    paths: [{ params: { id: "test" } }, { params: { id: "second" } }],
    fallback: false,
  };
}

// Similar to getStaticProps, you export it from the page component file, and you return an object with a props object:
// The context object in this case will contain, in addition to the params object received also in getStaticProps, we’ll also receive:
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
