import axios from "axios";
import { ListFav } from "../models/index.js";

describe("ListFav tests", () => {
  let token;
  beforeAll(async () => {
    // Login to get token
    const login = await axios.post("http://localhost:5000/api/users/login", {
      email: "esteban16.rodas@gmail.com",
      password: "1PassW",
    });
    const { token: tokenUser } = login.data;
    token = tokenUser;
  });

  it("should create a new listFav", async () => {
    const favList = {
      name: "Series",
      title: ["The Walking Dead", "The Witcher"],
      description: ["Serie about living deads", "Serie inspired from a game"],
      link: [
        "https://es.wikipedia.org/wiki/The_Walking_Dead_(serie_de_televisi%C3%B3n)",
        "https://www.netflix.com/title/80189685",
      ],
    };

    // User id 6255a4e06a9793184425c922 from esteban16.rodas@gmail.com
    const result = await axios.post(
      "http://localhost:5000/api/favs/create/6255a4e06a9793184425c922",
      favList,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Result ", result.data);
    expect(result.data).toBeDefined();
    expect(result.data.name).toEqual("Series");
    expect(result.data.title).toEqual(["The Walking Dead", "The Witcher"]);
    expect(result.data.link).toEqual([
      "https://es.wikipedia.org/wiki/The_Walking_Dead_(serie_de_televisi%C3%B3n)",
      "https://www.netflix.com/title/80189685",
    ]);
  });

  it("should get all listFav for all Users", async () => {
    const result = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(200);
  });

  it("should delete one FavList", async () => {
    // Search id to test
    const listFavs = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listFavToDelete = listFavs.data[1];
    const result = await axios.delete(
      `http://localhost:5000/api/favs/delete/${listFavToDelete._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Result ", result);
  });
});
