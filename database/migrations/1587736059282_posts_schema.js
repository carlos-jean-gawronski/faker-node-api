"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostsSchema extends Schema {
  up() {
    this.create("posts", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .notNullable();
      table.string("title", 100);
      table.string("description", 1000);
      table.timestamps();
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostsSchema;
