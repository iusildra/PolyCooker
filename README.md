# Polycooker

A little web app (in compliance with REST API) making your cooker life easier. You can easily create ingredients (when they are missing) and recipes. If you spot a nice recipe, you can add it to your calendar (with the number of people you want to cook for) and it will give you the list of what you need to cook every recipes you put in your calendar (you need to create an account first, only admins can create admins)

You can also delete recipes if you want. To prevent unwanted suppress, a little confirmation is required (you have to type the exact name of the recipe). There is a similar confirmation when you want to delete your account. However, when you delete your account, all your recipes are also deleted !

## Context
A web project wich free subject. I chose the cooking subject because I was tired of making the list of ingredients I needed to last at least 1 week (As you may have figured out, I'm not fond of shopping...)

## Stack
  - [Vue](https://vuejs.org/)
  - [Node](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)

## How to install
Run
```sh
npm install
```
in both `app/` and `api/` folder to install required dependencies
