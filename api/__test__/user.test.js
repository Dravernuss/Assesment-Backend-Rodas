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
    expect(result.data).toEqual(`User ${newUser.email} created sucessfully!`);
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
    expect(result.data).toEqual(
      `User ${userToDelete.email} deleted Successfully`
    );
  });
});
