import React from "react";
import { useRouter } from "next/router";

const transition = () => {
  const router = useRouter();
  const { from, to } = router.query;
  return (
    <>
      transitioning from: {from} to: {to}
    </>
  );
};

export default transition;
