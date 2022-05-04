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
    // User id 6255a4e06a9793184425c922 from esteban16.rodas@gmail.com
    const favList = {
      name: "Movies",
      user_id: "6255a4e06a9793184425c922",
      favs: [
        {
          title: "Star Wars",
          description: "Scy-fiction movie about jedi and sith",
          link: "https://es.wikipedia.org/wiki/Star_Wars",
        },
      ],
    };

    const result = await axios.post(
      "http://localhost:5000/api/favs/create",
      favList,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data).toBeDefined();
    expect(result.data.newList.name).toEqual("Movies");
    expect(result.data.newList.user_id).toEqual("6255a4e06a9793184425c922");
    expect(result.data.newList.favs).toBeDefined();
  });

  it("should fail creating a new list for missing token", async () => {
    const favList = {
      name: "Movies",
      user_id: "6255a4e06a9793184425c922",
      favs: [
        {
          title: "Star Wars",
          description: "Scy-fiction movie about jedi and sith",
          link: "https://es.wikipedia.org/wiki/Star_Wars",
        },
      ],
    };
    await axios
      .post("http://localhost:5000/api/favs/create", favList)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Missing  Bearer Auth (JWT)");
      });
  });

  it("should get all listFav for all Users", async () => {
    const result = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(200);
  });

  it("should fail getting all listFav for all Users for missing token", async () => {
    await axios.get("http://localhost:5000/api/favs").catch((error) => {
      const status = error.response.status;
      const message = error.response.data;
      expect(status).toEqual(403);
      expect(message).toEqual("Missing  Bearer Auth (JWT)");
    });
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

  it("should fail getting all listFav for a specific User for missing token", async () => {
    // User id 6255a4e06a9793184425c922 from esteban16.rodas@gmail.com
    await axios
      .get("http://localhost:5000/api/favs/6255a4e06a9793184425c922")
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Missing  Bearer Auth (JWT)");
      });
  });

  it("should get one listFav by list Id", async () => {
    // FavList id 6271f94f583bd81d769f00d7 from esteban16.rodas@gmail.com
    const result = await axios.get(
      "http://localhost:5000/api/favs/singlelist/6271f94f583bd81d769f00d7",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });

  it("should fail getting one listFav by list Id for missing token", async () => {
    // FavList id 6271f94f583bd81d769f00d7 from esteban16.rodas@gmail.com
    await axios
      .get("http://localhost:5000/api/favs/singlelist/6271f94f583bd81d769f00d7")
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Missing  Bearer Auth (JWT)");
      });
  });

  it("should add items to one FavList", async () => {
    // Search listFav id to test
    const listFavs = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listFavToUpdate = listFavs.data[1];
    const fav = {
      title: "Star Wars II",
      description: "Continue the Scy-fiction movie about jedi and sith",
      link: "https://es.wikipedia.org/wiki/Star_Wars",
    };
    const result = await axios.put(
      `http://localhost:5000/api/favs/update/${listFavToUpdate._id}`,
      fav,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
  });

  it("should fail add items to one FavList for missing token", async () => {
    // Search listFav id to test
    const listFavs = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listFavToUpdate = listFavs.data[1];
    const fav = {
      title: "Star Wars II",
      description: "Continue the Scy-fiction movie about jedi and sith",
      link: "https://es.wikipedia.org/wiki/Star_Wars",
    };
    await axios
      .put(`http://localhost:5000/api/favs/update/${listFavToUpdate._id}`, fav)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Missing  Bearer Auth (JWT)");
      });
  });

  it("should fail deleting one FavList for missing token", async () => {
    // Search favList id to delete
    const listFavs = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listFavToDelete = listFavs.data[1];
    await axios
      .delete(`http://localhost:5000/api/favs/delete/${listFavToDelete._id}`)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Missing  Bearer Auth (JWT)");
      });
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
