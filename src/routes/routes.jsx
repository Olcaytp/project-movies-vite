import { Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { MovieDetails } from "../pages/MovieDetails/MovieDetails";
import  NotFound  from "../pages/NotFound/NotFound";

const routes = (
  <>
    <Route path="/" exact  element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetails />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
