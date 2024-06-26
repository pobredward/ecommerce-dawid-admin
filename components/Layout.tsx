import { signIn, useSession } from "next-auth/react";
import Nav from "../components/Nav";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav></Nav>
      <div className="bg-white flex-grow m-2 ml-0 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
