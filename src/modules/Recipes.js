import React, { useEffect, useState } from "react";
import { remoteRoutes } from "../components/constants";
import RecipeCard from "../components/RecipeCard";
import CreateDialog from "../components/CreateDialog";
import AddRecipe from "../components/AddRecipe";
import Loading from "../services/Loading";
import XButton from "../components/XButton";

const Recipes = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(remoteRoutes.recipes)
      .then((response) => response.json())
      .then((newData) => {
        setData(newData);
        setLoading(false);
      });
  }, [open, reset]);

  const resetDatabase = async () => {
    await fetch(remoteRoutes.reset);
    setReset(!reset);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <main>
      <h1>Recipes</h1>
      <XButton
        text="Add Recipe"
        variant="contained"
        onClick={() => setOpen(true)}
      />
      <section className="recipe-card">
        {data.length > 1 &&
          data.map((it) => (
            <RecipeCard
              key={it.id}
              imageURL={it.imageUrl}
              imageTitle={it.title}
              recipeName={it.title}
              recipeId={it.id}
            />
          ))}
        <CreateDialog open={open} setOpen={setOpen}>
          <AddRecipe setOpen={handleClose} />
        </CreateDialog>
      </section>
      <footer>
        <hr />
        <XButton text="Reset Database" onClick={() => resetDatabase()} />
      </footer>
    </main>
  );
};

export default Recipes;
