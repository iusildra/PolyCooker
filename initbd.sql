create database "PolyCooker";
\c "PolyCooker"


create table seasons(
	season_id SMALLINT PRIMARY KEY,
	season_name TEXT NOT NULL
);

create table types(
	type_id SMALLINT PRIMARY KEY,
	type_name TEXT NOT NULL
);

create table diets(
	diet_id SMALLINT PRIMARY KEY,
	diet_name TEXT NOT NULL
);

create table units(
	unit_id SMALLINT PRIMARY KEY,
	unit_name TEXT NOT NULL
);

create table users(
	user_id TEXT PRIMARY KEY,
	email TEXT NOT NULL,
	username TEXT NOT NULL,
	admin BOOLEAN NOT NULL,
	passwd TEXT NOT NULL,
	registration DATE NOT NULL,
	last_login DATE
);

create table recipes(
	recipe_id TEXT,
	recipe_author TEXT REFERENCES users(user_id) ON DELETE CASCADE,
	recipe_name TEXT NOT NULL,
	recipe_for SMALLINT NOT NULL CHECK (recipe_for>0),
	recipe_steps TEXT NOT NULL,
	recipe_season INT REFERENCES seasons(season_id) ON DELETE SET NULL,
	recipe_type INT REFERENCES types(type_id) ON DELETE SET NULL,
	recipe_diet INT REFERENCES diets(diet_id) ON DELETE SET NULL,
	recipe_difficulty INT NOT NULL CHECK (recipe_difficulty > 0 AND recipe_difficulty <= 5),
	recipe_cost INT NOT NULL CHECK (recipe_cost > 0 AND recipe_difficulty <= 5), 
	creation_date DATE NOT NULL
	PRIMARY KEY (recipe_id, recipe_author)
);

create table ingredients(
	ingredient_id TEXT PRIMARY KEY,
	ingredient_name TEXT NOT NULL,
	ingredient_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	is_allergen BOOLEAN NOT NULL,
	ingredient_season INT REFERENCES seasons(season_id) ON DELETE SET NULL
);

create table reviews(
	author TEXT REFERENCES users(unit_id)
	associated_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	title TEXT NOT NULL,
	grade FLOAT NOT NULL,
	content TEXT,
	PRIMARY KEY (author, associated_recipe)
);

create table contains(
	in_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	the_ingredient TEXT REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
	quantity FLOAT NOT NULL,
	contained_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	PRIMARY KEY (in_recipe, the_ingredient)
);


insert into seasons values 
	(1, 'Winter'),
	(2, 'Spring'),
	(3, 'Summer'),
	(4, 'Autumn');
insert into types values
	(1, 'Starter'),
	(2, 'Main dish'),
	(3, 'Dessert'),
	(4, 'Appetizer'),
	(5, 'Side dish'),
	(6, 'Sauce'),
	(7, 'Drink'),
	(8, 'Sweet');
insert into diets values
	(1, 'Omnivorous'),
	(2, 'Vegetarian'),
	(3, 'Vegan');
insert into units values
	(1, 'g'),
	(2, 'kg'),
	(3, 'ml'),
	(4, 'cl'),
	(5, 'L'),
	(6, 'd.s'),
	(7, 't.s'),
	(8, 'pinch'),
	(9, 'handful of');

insert into ingredients values
	('r', 'Rice', 1, FALSE, NULL),
	('m', 'Melon', 1, FALSE, 3),
	('g', 'Grapes', 1, FALSE, 4);

insert into users(user_id, email, username, admin, passwd, registration) values
	('aaaa', 'LN@LN.LN', 'lulu', FALSE, 'azertyuiop', NOW());

insert into recipes values
	('a', 'Boiled rice', 'aaaa', 4, 'Boil some water, then throw the rice in', NULL, 2, 3, 1, 1, NOW()),
	('aa', 'Boiled rice bis', 'aaaa', 2,  'Boil some water, then throw the rice in', NULL, 2, 3, 1, 1, NOW()),
	('aaa', 'Boiled rice whith melon', 'aaaa', 10, 'Boil some water, then throw the rice & melon in', 3, 2, 3, 1, 1, NOW()),
	('aaaa', 'Boiled rice with grapes', 'aaaa', 5, 'Boil some water, then throw the rice & grapes in', 4, 2, 3, 1, 1, NOW());

insert into contains values 
	('a', 'r', 1, 2),
	('aa', 'r', 500, 1),
	('aaa', 'r', 750, 1), 
	('aaa', 'm', 250, 2),
	('aaaa', 'r', 1, 2),
	('aaaa', 'g', 2, 2);