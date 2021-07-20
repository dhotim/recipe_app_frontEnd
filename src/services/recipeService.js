import { remoteRoutes, methods } from "../components/constants";

export const insertRecipe = async (data) => {
  let method = "";
  let Url = "";
  const { ingredients } = data;
  data.ingredients = ingredients
    .split("\n")
    .filter((ingredient) => ingredient.length > 0);

  if (data.id === 0) {
    Url = remoteRoutes.recipes;
    method = methods.post;
    delete data.id;
  } else {
    Url = `${remoteRoutes.recipes}/${data.id}`;
    method = methods.put;
  }

  try {
    await fetch(Url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteRecipe = async (id) => {
  await fetch(`${remoteRoutes.recipes}/${id}`, {
    method: methods.delete,
  });
  return true;
};
