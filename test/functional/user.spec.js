"use strict";

const { test, trait } = use("Test/Suite")("User");

trait("Test/ApiClient");
trait("Auth/Client");

const data = {};
test("user can be created", async ({ client, assert }) => {
  const res = await client
    .post("/user")
    .send({
      username: "Josh",
      email: "josh@test.com",
      password: "12345",
    })
    .end();
  res.assertStatus(200);
  assert.property({ id: "" }, "id");
  data.userId = res.body.id;
}).timeout(0);

test("user can't be created with missing information", async ({ client }) => {
  const res = await client
    .post("/user")
    .send({
      username: "Mark",
      password: "12345",
    })
    .end();
  res.assertStatus(401);
}).timeout(0);

test("user can login", async ({ client, assert }) => {
  const res = await client
    .post("/session")
    .send({ email: "josh@test.com", password: "12345" })
    .end();
  res.assertStatus(200);
  assert.property({ token: "" }, "token");
  data.token = res.body.token;
}).timeout(0);

test("unexistent user can't login", async ({ client }) => {
  const res = await client
    .post("/session")
    .send({ email: "frank@test.com", password: "12345" })
    .end();
  res.assertStatus(404);
}).timeout(0);

test("user can update own profile", async ({ client }) => {
  const res = await client
    .put(`/user/${data.userId}`)
    .header("Authorization", `Bearer ${data.token}`)
    .send({ password: "4321" })
    .end();
  res.assertStatus(200);
}).timeout(0);

test("user can't update others profile", async ({ client }) => {
  const user2 = await client
    .post("/user")
    .send({
      username: "Michael",
      email: "michael@test.com",
      password: "12345",
    })
    .end();
  user2.assertStatus(200);
  data.user2 = user2.body.id;

  const res = await client
    .put(`/user/${user2.body.id}`)
    .header("Authorization", `Bearer ${data.token}`)
    .send({ password: "4321" })
    .end();

  res.assertStatus(401);
}).timeout(0);

test("user can delete own profile", async ({ client }) => {
  const res = await client
    .delete(`/user/${data.userId}`)
    .header("Authorization", `Bearer ${data.token}`)
    .end();
  res.assertStatus(204);
}).timeout(0);

test("user can't delete others profile", async ({ client }) => {
  const res = await client
    .put(`/user/${data.user2}`)
    .header("Authorization", `Bearer ${data.token}`)
    .end();
  res.assertStatus(401);
}).timeout(0);
