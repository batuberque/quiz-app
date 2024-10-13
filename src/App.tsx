import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import QuizPage from "./pages/QuizPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizPage />,
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
