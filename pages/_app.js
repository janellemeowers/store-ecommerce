import "@/styles/globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import { StateContext } from "@/context/StateContext";

export default function App({ Component, pageProps }) {
  //means each component is applied to, wrap Layout component with your html (header, main, footer)in
  return (
    <StateContext>
      <Layout>
        {/* //Toaster self closing for notifications, gets added to each page */}
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
    //wrap to track states
  );
}
