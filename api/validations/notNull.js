// Function who ensures that title, description and link properties aren't null
export const notNull = (title, description, link, res) => {
  if (!title) {
    console.log("Fav Title cannot be null");
    res.status(403).send("Fav Title cannot be null");
    throw new Error();
  }

  if (!description) {
    console.log("Fav Description cannot be null");
    res.status(403).send("Fav Description cannot be null");
    throw new Error();
  }

  if (!link) {
    console.log("Fav link cannot be null");
    res.status(403).send("Fav link cannot be null");
    throw new Error();
  }
};
