import React from "react";
import "./App.css";
import { GlobalStyles } from "./globalStyles";
import { PageRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    // <CookiesProvider>
      <div className="App">
        <GlobalStyles />
        <PageRoutes />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 6000,
            style: {
              background: "#FFFFFF",
              border: " 1px solid #ECF0F3",
              boxShadow: " 0px 2px 0px #EFF1F3",
              borderRadius: " 10px",
              padding: "16px 20px",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "22px",

              color: " #5D6167",
            },
            // Default options for specific types
            success: {
              duration: 3000,
              // theme: {
              //   secondary: "black",
              // },
            },

            error: {
              style: {
                // background: "red",
              },
            },
          }}
        />
      </div>
    // </CookiesProvider>
  );
}

export default App;
