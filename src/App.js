import { BrowserRouter, Switch, Route } from "react-router-dom"
import PublicLayout from "./layout/PublicLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { PUBLIC_ROUTER } from "./router/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/login" />
        <Route exact={true} path={PUBLIC_ROUTER.map((route) => route.path)}>
          <PublicLayout>
            <Switch>
              {PUBLIC_ROUTER.map((item, id) => {
                return (
                  <Route
                    key={item.key}
                    path={item.path}
                    exact={item.exact}
                    component={item.container}
                  ></Route>
                );
              })}
            </Switch>
          </PublicLayout>
        </Route>{" "}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
