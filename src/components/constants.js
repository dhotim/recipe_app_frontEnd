const url = "http://localhost:3000";
export const remoteRoutes = {
  recipes: url + "/recipes",
  reset: url + "/reset",
};

export const localRoutes = {
  details: "/details",
  recipes: "/recipes",
  home: "/",
  notfound: "*",
};

export const action = {
  add: "ADD",
  edit: "EDIT",
};

export const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
};
