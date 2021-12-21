import { useRouter } from "next/router";
const withAuth = (WrappedComponent) => {
  return function Auths(props) {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      //  let accessToken1 = [];

      //   let student1 = "Hello";

      //   accessToken1.push(student1);

      //   localStorage.setItem("accessToken1", JSON.stringify(student1));

      const accessToken = localStorage.getItem("accessToken1");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/auth");
        return (
          <>
            <div className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verifiying !!!
                  </h2>
                </div>
              </div>
            </div>
          </>
        );
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
