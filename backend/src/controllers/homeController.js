export const home = (req, res) => {
 res.render("index", { title: "My App", message: "Welcome to my app!" });
};