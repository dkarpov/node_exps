import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const link = ({ href, as, children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  let className = children.props.className || "";
  // console.log("@@@ file Link.js line 10", router.asPath, href, router);

  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return (
    <Link href={href} as={as}>
      {React.cloneElement(children, { className })}
    </Link>
  );
};

export default link;
