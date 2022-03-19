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