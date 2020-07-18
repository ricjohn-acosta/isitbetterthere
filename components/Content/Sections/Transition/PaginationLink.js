import React from "react";
import Link from "next/link";

const PaginationLink = ({ item, query, ...props }) => {
  return (
    <Link
      href={{ pathname: "/transition", query: { ...query, page: item.page } }}
      scroll={false}
    >
      <a {...props}></a>
    </Link>
  );
};

export default PaginationLink;
