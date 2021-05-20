# ![GA Logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Express Creatures CRUD

## Prereqs:

* Layouts and Controllers
* [CRUD/RESTful Routing in Express Lesson](https://gawdiseattle.gitbook.io/wdi/05-node-express/00readme-1/00readme) 
  * GET & POST lesson/code-along
  * PUT & DELETE lesson/code-along

--- 

## Overview

For this deliverable, you're going to add a prehistoric creatures section to your dino CRUD REST app.

Each prehistoric creature will have a `type` and an `img_url`, and the prehistoric creatures will be stored in a mock database with a `.json` file. 

example prehistoric_creature:

```json
{
  "type":"giant beaver",
  "img_url":"http://www.beringia.com/sites/default/files/Giant-Beaver-banner.jpg"
}
```

### User Stories

* As a user, I want to see all prehistoric creatures listed at once
* As a user, I want to see the details and image of prehistoric creature
* As a user, I want to use a form and add a prehistoric creature
* As a user, I want to use a form and edit a prehistoric creature
* As a user, I want to delete a specific prehistoric creature

Study the following RESTful routing table, you will need to implement the following routes and associated views for prehistoric creatures:

| HTTP VERB | URL pattern | Action \(CRUD\) | Description |
|------|-------------|-----------------|-------------|
| GET | `/prehistoric_creatures` | Index \(`READ`\) | lists all prehistoric creatures |
| GET | `/prehistoric_creatures/new` | New \(`READ`\) | shows a form to make a new prehistoric creature |
| POST | `/prehistoric_creatures` | Create \(`CREATE`\) | creates an prehistoric creature with the `POST` payload (form) data and `redirects` |
| GET | `/prehistoric_creatures/:id` | Show \(`READ`\) | list information about a specific prehistoric creature \(i.e. `/prehistoric creatures/1`\) |
| GET | `/prehistoric_creatures/edit/:id` | Edit \(`READ`\) | shows a form for editing a specific prehistoric creatures \(i.e. /`prehistoric_creatures/edit/1`\) |
| PUT | `/prehistoric_creatures/:id` | Update \(`UPDATE`\) | updates the data for a specific prehistoric_creature \(i.e. `/prehistoric creatures/1`\) and `redirects` |
| DELETE | `/prehistoric_creatures/:id` | Delete \(`DESTROY`\) | deletes the prehistoric creature with the specified id \(i.e. `/prehistoric creatures/1`\) and `redirects` |


## Getting Started

Add a `prehistoric_creatures.json` to your dino CRUD app, this will serve as you mock `database model` for prehistoric creatures.

```json
[
  {
    "type":"giant beaver",
    "img_url":"http://www.beringia.com/sites/default/files/Giant-Beaver-banner.jpg"
  },
  {
    "type":"mastodon",
    "img_url":"https://cdn-images-1.medium.com/max/1200/1*a2VvYsKGApR-E1SnT5O7yQ.jpeg"
  },
  {
    "type":"saber-toothed salmon",
    "img_url":"https://cottagelife.com/wp-content/uploads/2014/11/Oncorhynchus_rastrosus.jpg"
  },
  {
    "type":"megalonyx",
    "img_url":"https://animalgeography.files.wordpress.com/2018/08/sloth-banner-e1535192925361.jpg?w=584&h=325"
  }
]
```

**Hint:** To make a `MVC REST API` you will need to reorganize your routes into controllers (one controller for dinosaurs and one controller for prehistoric creatures)

**Hint:** Write out route backend API routes and test them with postman before you make your views.

**Hint:** You will need to have two folders inside your `views` directory, one for `dinosaurs` and one for `prehistoric_creatures`. Make sure to change your `res.render()` statements accordingly!

## Bonus

Style Your App with CSS

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.