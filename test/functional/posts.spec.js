"use strict";

const { test, trait } = use("Test/Suite")("Posts");

trait("Test/ApiClient");
trait("Auth/Client");

const data = {};
test("user can create a post", async ({ client, assert }) => {
  const res = await client
    .post("/user")
    .send({ username: "Louis", email: "louis@test.com", password: "123" })
    .end();
  res.assertStatus(200);
  assert.property({ id: "" }, "id");
  data.user1 = res.body.id;

  const session = await client
    .post("/session")
    .send({ email: "louis@test.com", password: "123" })
    .end();
  session.assertStatus(200);
  assert.property({ token: "" }, "token");
  data.token1 = session.body.token;

  const post = await client
    .post("/posts")
    .header("Authorization", `Bearer ${data.token1}`)
    .send({
      user_id: data.user1,
      title: "First post",
      description: "First post in the application",
    })
    .end();
  post.assertStatus(200);
  assert.property({ id: "" }, "id");
  data.post1 = res.body.id;
}).timeout(0);

test("user can't create a post to different user profile", async ({
  client,
  assert,
}) => {
  const res = await client
    .post("/user")
    .send({ username: "Leonard", email: "leonard@test.com", password: "123" })
    .end();
  res.assertStatus(200);
  assert.property({ id: "" }, "id");
  data.user2 = res.body.id;

  const session = await client
    .post("/session")
    .send({ email: "leonard@test.com", password: "123" })
    .end();
  session.assertStatus(200);
  assert.property({ token: "" }, "token");
  data.token2 = session.body.token;

  const post = await client
    .post("/posts")
    .header("Authorization", `Bearer ${data.token2}`)
    .send({
      userId: data.user1,
      title: "First post",
      description: "First post in the application",
    })
    .end();
  post.assertStatus(401);
}).timeout(0);

test("user can't update a post from other profile", async ({ client }) => {
  const res = await client
    .put(`/posts/${data.post1}`)
    .header("Authorization", `Bearer ${data.token2}`)
    .send({ title: "Don't change the title" })
    .end();
  res.assertStatus(401);
}).timeout(0);

test("user can't delete a post from other profile", async ({ client }) => {
  const res = await client
    .delete(`/posts/${data.post1}`)
    .header("Authorization", `Bearer ${data.token2}`)
    .end();
  res.assertStatus(401);
}).timeout(0);

test("user can update a post from own profile", async ({ client }) => {
  const res = await client
    .put(`/posts/${data.post1}`)
    .header("Authorization", `Bearer ${data.token1}`)
    .send({ title: "New title" })
    .end();
  res.assertStatus(200);
}).timeout(0);

test("user can delete a post from own profile", async ({ client }) => {
  const res = await client
    .delete(`/posts/${data.post1}`)
    .header("Authorization", `Bearer ${data.token1}`)
    .end();
  res.assertStatus(204);
}).timeout(0);
