import { RouterProvider } from "react-router-dom";
import { router } from "./routes/root.jsx";
import useUserStore from "./store/user.store.js";
import { useEffect } from "react";
const App = () => {
  const { checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();

    console.log("The auth is checking on every refresh");
  }, [checkAuth]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
