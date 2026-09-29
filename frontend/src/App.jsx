import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Library from "./pages/Library";

function App() {
  const [page, setPage] = useState("login");

  if (page === "signup") {
    return <Signup onLogin={() => setPage("login")} />;
  }

  if (page === "library") {
    return <Library />;
  }

  return (
    <Login
      onSignup={() => setPage("signup")}
      onLoginSuccess={() => setPage("library")}
    />
  );
}

export default App;