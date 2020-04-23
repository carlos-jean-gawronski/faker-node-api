<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/carlos-jean-gawronski/faker-node-api">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/carlos-jean-gawronski/faker-node-api">
  
  <a href="https://github.com/carlos-jean-gawronski/faker-node-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/carlos-jean-gawronski/faker-node-api">
  </a>

  <a href="https://github.com/carlos-jean-gawronski/faker-node-api/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/carlos-jean-gawronski/faker-node-api">
  </a>
</p>

## Setup

To setup the enviroment to use this project for testing is quite simple. You sould only follow the steps bellow.

```bash
adonis key:generate

yarn install
```

Optionally, you can use npm to make the repository dependencies installation. However, you'll need to delete the `yarn.lock` and `yarn-error.log` files not to have conflicts between locks files.

```bash
npm install
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
