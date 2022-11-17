import React from "react";
import ReactDOM from "react-dom/client";
import ContactForm from "./components/ContactForm/ContactForm";

const root = ReactDOM.createRoot(
  document.querySelector("#contacts__form-wrap")
);
root.render(<ContactForm />);
