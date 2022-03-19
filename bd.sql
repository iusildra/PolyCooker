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
	recipe_id TEXT PRIMARY KEY,
	recipe_name TEXT NOT NULL,
	recipe_author TEXT REFERENCES users(user_id) ON DELETE CASCADE,
	recipe_for SMALLINT NOT NULL CHECK (recipe_for>0),
	recipe_steps TEXT NOT NULL,
	recipe_season INT REFERENCES seasons(season_id) ON DELETE SET NULL,
	recipe_type INT REFERENCES types(type_id) ON DELETE SET NULL,
	recipe_diet INT REFERENCES diets(diet_id) ON DELETE SET NULL,
	recipe_difficulty INT NOT NULL CHECK (recipe_difficulty > 0 AND recipe_difficulty <= 5),
	recipe_cost INT NOT NULL CHECK (recipe_cost > 0 AND recipe_difficulty <= 5), 
	creation_date DATE NOT NULL
);

create table ingredients(
	ingredient_id TEXT PRIMARY KEY,
	ingredient_name TEXT NOT NULL,
	ingredient_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	is_allergen BOOLEAN NOT NULL,
	ingredient_season INT REFERENCES seasons(season_id) ON DELETE SET NULL
);

create table reviews(
	review_id SERIAL,
	associated_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	title TEXT NOT NULL,
	grade FLOAT NOT NULL,
	content TEXT,
	PRIMARY KEY (review_id, associated_recipe)
);

create table contains(
	in_recipe TEXT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	the_ingredient TEXT REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
	quantity FLOAT NOT NULL,
	contained_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	PRIMARY KEY (in_recipe, the_ingredient)
);