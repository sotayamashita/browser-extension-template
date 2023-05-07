import React from "react";
import Layout from "./layout";
import { createRoot } from "react-dom/client";

function Option() {
  return (
    <Layout>
      <h1>Options</h1>
    </Layout>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<Option />);
