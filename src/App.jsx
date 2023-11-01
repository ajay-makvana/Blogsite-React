import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <div>
        <div className="text-3xl">Blog App React + Appwrite</div>
      </div>
    </>
  );
}

export default App;
