// code sample
const Post = (props) => {
  const router = useRouter();

  const post = posts[router.query.id];

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
};

export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Post;
