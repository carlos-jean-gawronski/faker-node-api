"use strict";

const User = use("App/Models/User");
class SessionController {
  async create({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(404).send({ error: "User not found" });
    }

    return await auth.attempt(email, password);
  }
}

module.exports = SessionController;
