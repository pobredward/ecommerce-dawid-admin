import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-3 rounded-lg"
          >
            Login with google
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Logged in</div>;
  }
};

export default Home;
