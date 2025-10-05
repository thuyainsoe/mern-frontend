import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes.jsx";
import { getRoutes } from "./router/routes/index.jsx";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  return <Router allRoutes={allRoutes} />;
}

export default App;
