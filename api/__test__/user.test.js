import axios from "axios";

describe("User test", () => {
  let token;
  it("should create a new User", async () => {
    const newUser = {
      email: "test@test.com",
      password: "2WassPS",
    };

    const result = await axios.post(
      "http://localhost:5000/api/users/create",
      newUser
    );
    expect(result.data.message).toEqual(
      `User ${newUser.email} created sucessfully!`
    );
  });

  it("should have failed creating a new User for repeting email", async () => {
    const newUser = {
      email: "test@test.com",
      password: "2WassPS",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual("Email already exists!");
      });
  });

  it("should have failed creating a new User for null email", async () => {
    const newUser = {
      email: "",
      password: "2WassPS",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual("Email cannot be null");
      });
  });

  it("should have failed creating a new User for invalid email", async () => {
    const newUser = {
      email: "testtest.com",
      password: "2WassPS",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual("Invalid email");
      });
  });

  it("should have failed creating a new User for null password", async () => {
    const newUser = {
      email: "test@test2.com",
      password: "",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual("Password cannot be null");
      });
  });

  it("should have failed creating a new User for password < 6 digits", async () => {
    const newUser = {
      email: "test@test2.com",
      password: "2Wass",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual("Password must be at least 6 characters");
      });
  });

  it("should have failed creating a new User for invalid password", async () => {
    const newUser = {
      email: "test@test2.com",
      password: "2wasss",
    };

    await axios
      .post("http://localhost:5000/api/users/create", newUser)
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data.message;
        expect(status).toEqual(403);
        expect(message).toEqual(
          "Password Must have at least 1 uppercase, 1 lowercase letter and 1 number"
        );
      });
  });

  it("should login with new User", async () => {
    const result = await axios.post("http://localhost:5000/api/users/login", {
      email: "test@test.com",
      password: "2WassPS",
    });
    const { token: tokenUser } = result.data;
    token = tokenUser;
    expect(result.data.token).toContain(`${token}`);
  });

  it("should fail login with new User for invalid password", async () => {
    await axios
      .post("http://localhost:5000/api/users/login", {
        email: "test@test.com",
        password: "2WassP",
      })
      .catch((error) => {
        const status = error.response.status;
        const message = error.response.data;
        expect(status).toEqual(403);
        expect(message).toEqual("Invalid Password");
      });
  });

  it("should get all Users", async () => {
    const result = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(200);
  });

  it("should get one User by Id", async () => {
    const listUsers = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userToGet = listUsers.data[1];
    const result = await axios.get(
      `http://localhost:5000/api/users/${userToGet._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });

  it("should delete the created User by Id", async () => {
    // Search user id to delete
    const listUsers = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userToDelete = listUsers.data[1];
    const result = await axios.delete(
      `http://localhost:5000/api/users/delete/${userToDelete._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.message).toEqual(
      `User ${userToDelete.email} deleted Successfully`
    );
  });
});
