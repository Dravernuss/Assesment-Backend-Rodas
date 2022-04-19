// Ensuring that any elements in arrays aren't null
export const notNullOnArray = (title, description, link, res) => {
  title.map((stitle) => {
    if (stitle === "") {
      console.log("Null title is forbidden");
      res.status(403).send("Null title is forbidden");
      throw new Error();
    }
  });

  link.map((slink) => {
    if (slink === "") {
      console.log("Null link is forbidden");
      res.status(403).send("Null link is forbidden");
      throw new Error();
    }
  });
  description.map((sdescription) => {
    if (sdescription === "") {
      console.log("Null description is forbidden");
      res.status(403).send("Null description is forbidden");
      throw new Error();
    }
  });
};
