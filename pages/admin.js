import { getSession } from "next-auth/client";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { getUser } from "../server/db";
import request from "superagent";

// delete experiences
const admin = ({ session, user }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    let id = input && parseInt(input);

    if (session && user.permission === "admin") {
      try {
        request
          .delete(
            process.env.NODE_ENV === "production"
              ? process.env.prod + "/api/experiences"
              : process.env.dev + "/api/experiences"
          )
          .send({ id: id })
          .then((res) => console.log("EXPERIENCE DELETED"));
      } catch (error) {
        console.log("DELETING REPORTED EXPERIENCE FAILED", error);
      }
    }
    document.getElementById("delete-form").reset();
  };

  return (
    <form id="delete-form" onSubmit={handleSubmit}>
      <TextField type="text" />
      <Button type="submit">Delete</Button>
    </form>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let user = null;

  if (!session) {
    context.res.writeHead(403);
    context.res.end();
  }

  if (session) {
    if (!(await getUser(session.id))) {
      context.res.writeHead(403);
      context.res.end();
    } else {
      const userData = await getUser(session.id);
      userData.permission !== "admin"
        ? context.res.writeHead(403)
        : (user = userData);
    }
  }

  return {
    props: {
      session,
      user,
    },
  };
}

export default admin;
