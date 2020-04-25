"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use("App/Models/Post");

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return await Post.all();
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(["user_id", "title", "description"]);

    if (data.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }

    return await Post.create(data);
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    return await Post.findOrFail(params.id);
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const post = await Post.findOrFail(params.id);
    const data = request.body;

    if (post.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }
    post.merge(data);

    return await post.save();
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const post = await Post.findOrFail(params.id);

    if (post.user_id !== auth.user.id) {
      return response.status(401).send({ error: "Not authorized" });
    }
    await post.delete();
  }
}

module.exports = PostController;
