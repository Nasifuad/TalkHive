import { RouterProvider } from "react-router-dom";
import { router } from "./routes/root.jsx";
import useUserStore from "./store/user.store.js";
import { useEffect } from "react";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useUserStore();
  console.log("This is coming from App", authUser);

  useEffect(() => {
    checkAuth();
    console.log("The auth is checking on every refresh");
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
