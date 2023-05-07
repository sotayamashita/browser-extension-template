import React from "react";
import Layout from "./layout";
import { createRoot } from "react-dom/client";

function Popup() {
  return (
    <Layout>
      <h1>Popup</h1>
    </Layout>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<Popup />);
