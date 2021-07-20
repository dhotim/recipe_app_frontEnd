import React, { useEffect, useState } from "react";
import { localRoutes, remoteRoutes } from "../components/constants";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import defImage from "../images/defImage.png";
import Lists from "../components/Lists";
import NewLineText from "../components/NewLineText";
import CreateDialog from "../components/CreateDialog";
import AddRecipe from "../components/AddRecipe";
import Loading from "../services/Loading";
import XButton from "../components/XButton";
import NotFound from "./NotFound";

const RecipeDetails = (props) => {
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const { id } = useParams();
  const url = `${remoteRoutes.recipes}/${id}`;
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const homeView = () => {
    history.push(`${localRoutes.home}`);
  };

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          return response;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        try {
          const { ingredients } = data;
          data.ingredients = ingredients.join("\n");
          setRecipe(data);
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      });
  }, [url, open]);

  const openInDialog = (item) => {
    setRecipeToEdit(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className="main-body">
      <section className="recipe-header">
        <Lists content={<XButton text="Back" onClick={homeView} />} />
        {recipe && (
          <Lists
            content={
              <XButton
                text="Edit Recipe"
                onClick={() => openInDialog(recipe)}
              />
            }
          />
        )}
      </section>
      {loading ? (
        <Loading />
      ) : !recipe ? (
        <NotFound />
      ) : (
        <>
          <section className="recipe-details">
            <section className="forMobile">
              <figure className="image-container">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  onError={(e) => (e.target.src = defImage)}
                />
              </figure>
              <header className="recipe-name">
                <h2>{recipe.title}</h2>
              </header>
              <article className="description">{recipe.description}</article>
            </section>
            <section className="ingredients">
              <h3>Ingredients</h3>
              {recipe.ingredients.split("\n").map((item, index) => (
                <div key={index}>
                  {item}
                  <hr />
                </div>
              ))}
            </section>
          </section>
          <aside className="recipe-aside">
            <article>
              <header className="instructions">
                <h3>Instructions</h3>
              </header>
              <Lists content={<NewLineText text={recipe.instructions} />} />
            </article>
          </aside>

          <CreateDialog open={open}>
            <AddRecipe
              setOpen={handleClose}
              recipeToEdit={recipeToEdit}
              viewHome={homeView}
            />
          </CreateDialog>
        </>
      )}
    </main>
  );
};

export default RecipeDetails;
