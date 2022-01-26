import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IDark {
    isDark:boolean;
}

function Router({isDark}:IDark){

    return (
        <BrowserRouter>
         <Switch>
          <Route path="/:coinId">
           <Coin isDark={isDark}/>
          </Route>
          <Route path="/">
           <Coins/>
          </Route>
         </Switch>
        </BrowserRouter>
    )
}

export default Router;