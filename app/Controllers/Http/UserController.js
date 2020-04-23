"use strict";

const User = use("App/Models/User");

class UserController {
  async index() {
    return await User.all();
  }

  async show({ params }) {
    return await User.findOrFail(params.id);
  }

  async store({ request, response }) {
    const data = request.only(["username", "email", "password"]);

    if (!data.username || !data.email || !data.password) {
      return response.status(401).send({ error: "All fields must be filled" });
    }
    return await User.create(data);
  }

  async update({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id);

    if (user.id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: "Not authorized to update a diffent profile" });
    }

    const data = request.body;

    user.merge(data);
    await user.save();
    return user;
  }

  async delete({ params, response, auth }) {
    const user = await User.findOrFail(params.id);

    if (user.id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: "Not authorized to delete a diffent profile" });
    }

    await user.delete();
  }
}

module.exports = UserController;
