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

create table recipe_unit(
	recipe_unit_id SMALLINT PRIMARY KEY,
	recipe_unit_name TEXT NOT NULL,
)

create table users(
	user_id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	first_name TEXT,
	last_name TEXT,
	admin BOOLEAN NOT NULL,
	registration DATE NOT NULL
);

create table recipes(
	recipe_id BIGSERIAL PRIMARY KEY,
	recipe_name TEXT NOT NULL,
	recipe_author INT REFERENCES users(user_id) ON DELETE CASCADE,
	recipe_for INT NOT NULL,
	recipe_steps TEXT NOT NULL,
	recipe_season INT REFERENCES seasons(season_id) ON DELETE SET NULL,
	recipe_type INT REFERENCES types(type_id) ON DELETE SET NULL,
	recipe_diet INT REFERENCES diets(diet_id) ON DELETE SET NULL,
	recipe_difficulty FLOAT NOT NULL CHECK (recipe_difficulty > 0 AND recipe_difficulty <= 5),
	recipe_cost FLOAT NOT NULL CHECK (recipe_cost > 0 AND recipe_difficulty <= 5), 
	creation_date DATE NOT NULL
);

create table ingredients(
	ingredient_id BIGSERIAL PRIMARY KEY,
	ingredient_name TEXT NOT NULL,
	ingredient_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	avg_price FLOAT,
	allergen BOOLEAN NOT NULL,
	season INT REFERENCES seasons(season_id) ON DELETE SET NULL,
	CONSTRAINT positive_price CHECK (avg_price > 0)
);

create table reviews(
	review_id SERIAL,
	associated_recipe INT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	grade FLOAT NOT NULL,
	content TEXT,
	PRIMARY KEY (review_id, associated_recipe)
);

create table contains(
	in_recipe INT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
	the_ingredient INT REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
	quantity FLOAT NOT NULL,
	contained_unit INT REFERENCES units(unit_id) ON DELETE SET NULL,
	PRIMARY KEY (in_recipe, the_ingredient)
);