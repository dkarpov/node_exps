import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const router = useRouter();

  useEffect(() => {
    // push() allows us to programmatically trigger a URL change, in the frontend:
    // prefetch() allows us to programmatically prefetch a URL, useful when we don’t have a Link tag which automatically handles prefetching for us:
    // router.push('/login')
    router.prefetch("/login");
  });
};
