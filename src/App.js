import "./App.css";
import Recipes from "./modules/Recipes";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipeDetails from "./modules/RecipeDetails";
import NotFound from "./modules/NotFound";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/">
          <Recipes />
        </Route>
        <Route path="/details/:id">
          <RecipeDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
