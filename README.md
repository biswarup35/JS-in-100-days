# Welcome

Javascript is one of the easiest programming languages to learn but, people find it either hard or weird, Why?

JavaScript is so flexible - It is a multi paradigm, prototype based object oriented programming language. It supports object oriented, imperative and functional programming styles. This is where people find it hard because developers can leverage many programming styles. The same thing can be done in many ways in JavaScript. For lerners it may lead to confusion.

Therefore, we the JavaScript developers should help the newbies by explaining the core concepts. This OpenSource blog is dedicated to the JavaScript community. How yo can help?

- Share your best resources.
- Do a blog post to explain JavaScript concepts.

## How to contribute?

This website is built on [Docusaurus V2](https://github.com/facebook/docusaurus) specially crafted for technical documentations. If you are not familiar with the Docusaurus don't worry, follow below instartions to get started with.

Fork the main repo, and add yourself to the watch list to keep up with the changes.

And then run:

```sh
yarn install
```

or

```sh
npm install
```

This will install all the required dependencies to the local copy.

### Resources

In order to add resources, go to the `/javascript_docs/day-*` file, at the end of the document you will find a resource section.

#### Resource type allowed

- References
- Articles
- Video

### Blog Post

In order to post a blog post, go to `/blog/` folder. Create a folder for your blog post, follow this convention `YYYY-MM-DD-post-title`. Inside this folder, create a file `index.md` or `index.mdx`. Here is an example:

```
// /blog/2021-11-7-welcome/index.md
---
title: Welcome to JS in 100 days opensource blog
description: This is my first post on JS in 100 days blog.
slug: welcome-post-slug
authors:
  - name: John Doe
    title: Frontend Web developer
    url: https://github.com/JohnDoe
    image_url: https://github.com/JohnDoe.png
tags: [JavaScript, Closure]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---
Welcome to this blog.

![alt text](./2021-11-7-welcome/image.png)

```

place image assets inside `YYYY-MM-DD-post-title/` folder and use those assets inside `index.md` or `index.mdx` i.e. `/blog/2021-11-7-welcome/index.md`.

## Check before commiting

Before you commit, ensure that it did not break anyting.
Run the build command to test:

```sh
yarn build
```

or

```sh
npm run build
```

If everything looks good, rise a PR to the main branch. Make sure to add meaningful commit messages. Then wait for the merge 😊

# LICENCE

By contributing, you are agree that your contributions will be licensed under its MIT license.
