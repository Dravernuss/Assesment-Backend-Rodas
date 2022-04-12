import axios from "axios";

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
    expect(result.data).toBeDefined();
    expect(result.data.name).toEqual("Series");
    expect(result.data.title).toEqual(["The Walking Dead", "The Witcher"]);
    expect(result.data.description).toEqual([
      "Serie about living deads",
      "Serie inspired from a game",
    ]);
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

  it("should get all listFav for a specific User", async () => {
    // User id 6255a4e06a9793184425c922 from esteban16.rodas@gmail.com
    const result = await axios.get(
      "http://localhost:5000/api/favs/6255a4e06a9793184425c922",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });

  it("should get one listFav by list Id", async () => {
    // User id 6255a4e06a9793184425c922 from esteban16.rodas@gmail.com
    const result = await axios.get(
      "http://localhost:5000/api/favs/singlelist/6255bcaf82495c6cfffcb15f",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });

  it("should edit or add items to one FavList", async () => {
    // Search listFav id to test
    const listFavs = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listFavToUpdate = listFavs.data[1];
    const favList = {
      name: "Series",
      title: ["The Walking Dead", "The Witcher 2"],
      description: ["Serie about living deads", "Serie inspired from a game 2"],
      link: [
        "https://es.wikipedia.org/wiki/The_Walking_Dead_(serie_de_televisi%C3%B3n)",
        "https://www.netflix.com/title/80189685",
      ],
    };
    const result = await axios.put(
      `http://localhost:5000/api/favs/update/${listFavToUpdate._id}`,
      favList,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
    expect(result.data.modifiedCount).toEqual(1);
  });

  it("should delete one FavList", async () => {
    // Search favList id to delete
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
    expect(result.data).toEqual(
      `ListFav ${listFavToDelete.name} deleted Successfully`
    );
  });
});
