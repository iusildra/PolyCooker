create database "PolyCooker";
\c "PolyCooker"


create table seasons(
	season_name TEXT PRIMARY KEY
);

create table types(
	type_name TEXT PRIMARY KEY
);

create table diets(
	diet_name TEXT PRIMARY KEY
);

create table units(
	unit_name TEXT PRIMARY KEY
);

create table users(
	user_id TEXT PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	username TEXT NOT NULL UNIQUE,
	admin BOOLEAN NOT NULL,
	passwd TEXT NOT NULL,
	registration DATE NOT NULL,
	last_login DATE
);

create table recipes(
	recipe_id TEXT PRIMARY KEY,
	recipe_author TEXT REFERENCES users(user_id) ON DELETE CASCADE,
	recipe_name TEXT NOT NULL,
	recipe_for SMALLINT NOT NULL CHECK (recipe_for>0),
	recipe_duration SMALLINT CHECK (recipe_duration > 0),
	recipe_steps TEXT NOT NULL,
	recipe_season TEXT REFERENCES seasons(season_name) ON DELETE SET NULL,
	recipe_type TEXT REFERENCES types(type_name) ON DELETE SET NULL,
	recipe_diet TEXT REFERENCES diets(diet_name) ON DELETE SET NULL,
	recipe_difficulty INT NOT NULL CHECK (recipe_difficulty >= 0 AND recipe_difficulty <= 5),
	recipe_cost INT NOT NULL CHECK (recipe_cost >= 0 AND recipe_difficulty <= 5), 
	creation_date DATE NOT NULL
);

create table ingredients(
	ingredient_name TEXT PRIMARY KEY,
	is_allergen BOOLEAN NOT NULL,
	ingredient_season TEXT REFERENCES seasons(season_name) ON DELETE SET NULL
);

-- create table reviews(
-- 	author TEXT REFERENCES users(user_id),
-- 	associated_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
-- 	title TEXT NOT NULL,
-- 	grade FLOAT NOT NULL,
-- 	content TEXT,
-- 	PRIMARY KEY (author, associated_recipe)
-- );

create table contains(
	in_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	the_ingredient TEXT REFERENCES ingredients(ingredient_name) ON DELETE SET NULL,
	quantity FLOAT NOT NULL,
	contained_unit TEXT REFERENCES units(unit_name) ON DELETE SET NULL,
	PRIMARY KEY (in_recipe, the_ingredient)
);


insert into seasons values 
	('Winter'),
	('Spring'),
	('Summer'),
	('Autumn');
insert into types values
	('Starter'),
	('Main dish'),
	('Dessert'),
	('Appetizer'),
	('Side dish'),
	('Sauce'),
	('Drink'),
	('Sweet');
insert into diets values
	('Omnivorous'),
	('Vegetarian'),
	('Vegan');
insert into units values
	('g'),
	('kg'),
	('ml'),
	('cl'),
	('L'),
	('d.s'),
	('t.s'),
	('pinch'),
	('handful of');

insert into ingredients values
	('Rice', FALSE, NULL),
	('Melon', FALSE, 3),
	('Grapes', FALSE, 4);

insert into users(user_id, email, username, admin, passwd, registration) values
	('abcd', 'a', 'a', TRUE, 'azerty', NOW()),
	('aaaa', 'b', 'b', FALSE, 'azertyuiop', NOW());

insert into recipes values
	('a', '9eade1ec-2a04-459e-8297-68a293c38554', 'Boiled rice', 4, 30, 'Boil some water, then throw the rice in', NULL, 'Main dish', 'Vegan', 1, 1, NOW()),
	('aa', 'aaaa', 'Boiled rice bis', 2, 30, 'Boil some water, then throw the rice in', NULL, 'Main dish', 'Vegan', 1, 1, NOW()),
	('aaa', '9eade1ec-2a04-459e-8297-68a293c38554', 'Boiled rice whith melon', 20, 10, 'Boil some water, then throw the rice & melon in', 'Summer', 'Main dish', 'Vegan', 1, 1, NOW()),
	('aaaa', '9eade1ec-2a04-459e-8297-68a293c38554', 'Boiled rice with grapes', 15, 5, 'Boil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\nBoil some water, then throw the rice & grapes in\n\n', 'Autumn', 'Main dish', 'Vegan', 0.5, 0.5, NOW());

insert into contains values 
	('a', 'Rice', 1, 'kg'),
	('aa', 'Rice', 500, 'g'),
	('aaa', 'Rice', 750, 'g'), 
	('aaa', 'Melon', 250, 'kg'),
	('aaaa', 'Rice', 1, 'kg'),
	('aaaa', 'Grapes', 2, 'kg');