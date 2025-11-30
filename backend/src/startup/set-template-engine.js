import pug from "pug";

const setTemplateEngine = (app) => {
    // 1. Set the view engine to Pug
  app.set("view engine", "pug");
  // 2. Set the folder for templates
  app.set("views", "./src/views");
};
export default setTemplateEngine;