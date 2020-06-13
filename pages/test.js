import { getUsers, registerUser } from "../server/db";
import { session, getSession } from "next-auth/client";

const test = ({ users, noAuth }) => {
  if (users) {
    return (
      <div>
        {JSON.stringify(users)}
        <form></form>
      </div>
    );
  } else {
    return <div>{noAuth}</div>;
  }
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  console.log("testt", session)
  if (session) {
    const users = await getUsers();
    return { props: { users } };
  } else {
    return { props: { noAuth: "Forbidden" } };
  }
};

export default test;
