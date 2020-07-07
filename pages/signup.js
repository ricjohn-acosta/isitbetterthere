import React from "react";
import { csrfToken, signin, providers } from "next-auth/client";
import Button from "@material-ui/core/Button";


// Remove csrftoken and email provider completely? 
export default ({ csrfToken, providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) =>
        provider.name === "Email" ? null : (
          <p key={provider.name}>
            <Button
              href={`/api/auth/signin/${provider.name.toLowerCase()}?callbackUrl=${
                process.env.NODE_ENV !== "production"
                  ? "http://localhost:3000/account-setup"
                  : process.env.SITE
              }`}
            >
              Sign in with {provider.name}
            </Button>
          </p>
        )
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  // const test = await csrfToken(context)
  return {
    props: {
      // csrfToken: await csrfToken(context),
      providers: await providers(context),
    },
  };
}
