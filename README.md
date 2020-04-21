# Projects
This is where I keep all the final versions of my projects. This README will be updated whenever a new project is added. 
## This repository currently includes:
* corona-tracker: this is version 1 of my Coronavirus tracker. Preview it [here](https://ocdian.github.io/corona-tracker/index.html). Its features include:
  * Global stats
  * Charts of global stats
  * Stats for each country
  * Map, which displays information about affected countries
* corona-tracker-v2: this is version 2 of my Coronavirus tracker. Preview it [here](https://ocdian.github.io/corona-tracker-v2/index.html). Its features include:
  * Enhanced UI
  * Additional information
  * More interactive
  * Organized interfaces:
    * The dashboard: See global stats and charts
    * The tables: See paginated tables that include information about every affected country. Get more details about a specific country using the search functionality
    * The charts: Choose two countries to view a visual comparison of their history since the start of the pandemic
    * The map: A responsive heatmap of the affected countries. Hover over a country to see its stats
* corona-tracker-v2-alpha: this is the alpha version of corona-tracker-v2, and has most its features. Preview it [here](https://ocdian.github.io/corona-tracker-v2-alpha/index.html). However it did have some bugs:
  * The map took a long time to load and didn't look good on a phone. It also didn't allow vertical panning. This problem was fixed in corona-tracker-v2 by adding a heatmap that took less time to load, was better for demonstrating the pandemic and allowed for vertical panning.
  * The search functionality only accepted the input if it matched the search suggestions. This was fixed in corona-tracker-v2. The user can enter the name in any form and as long as its correct it will be accepted.
  * The tables didn't allow scrolling on a phone. This was fixed in corona-tracker-v2
* instaclone: An Instagram clone made with Laravel. A user can sign up, sign in, update his/her profile, post images and follow other users. This is my first back-end web project.
* larticle: An example of CRUD (Create, Read, Update, Delete). This project includes an articles API built with Laravel, it allows a user to see all existing articles in the database, edit/delete an existing article and add articles. This project also includes a front-end interface built with Vue.js that interacts with the API.
