import Background from "@components/Background";
import { RouterProvider } from "react-router-dom";
import router from "./route-config";
import { SnackbarProvider } from "notistack";

const App = () => {  

  return (
    <SnackbarProvider>
      <Background>
        <RouterProvider router={router} />
      </Background>
    </SnackbarProvider>
  );
};

export default App;
