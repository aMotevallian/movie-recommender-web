import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (Component: React.FC) => {
  const AuthHOC: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the window object is available to ensure we're on the client-side
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        // If there's no token, redirect to the register page
        if (!token) {
          router.push("/register");
        }
      }
    }, [router]);

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
