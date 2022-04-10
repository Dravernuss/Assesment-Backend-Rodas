// Ensuring every favorite have their properties in their position
export const dataMissing = (title, description, link, res) => {
  if (title.length !== description.length || title.length !== link.length) {
    console.log("Data is missing in body");
    res.status(403).send("Data is missing in body");
    throw new Error();
  }
};
