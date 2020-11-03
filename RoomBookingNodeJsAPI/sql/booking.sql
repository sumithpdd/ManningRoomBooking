-- CREATE TABLE `users` (
--   `id` int unsigned NOT NULL AUTO_INCREMENT,
--   `name` varchar(255) DEFAULT NULL,
--   `username` varchar(255) DEFAULT NULL,
--   `password` varchar(255) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
-- INSERT INTO `my_db`.`users`
-- (`id`,`name`,`username`,`password`)
-- VALUES
-- (1,'Adam','adam','$2b$10$NHAVz2PePSXWmqUNjqLavO9jWAA15lbib.GJCERPxyY.x63LueiJe');
-- INSERT INTO `my_db`.`users`
-- (`id`,`name`,`username`,`password`)
-- VALUES
-- (2,'Sumith','sumithpd','$2b$10$uebUaQpfIkJF8Iir.HRyHuvR7y0D.dx.NYMbk2xi8YYk4Oucw2tFS');

create table layout(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL, 
	description VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id)
);
insert into layout (id, name, description) values (1, 'THEATER', 'Theater');
insert into layout (id, name, description) values (2, 'USHAPE', 'U-Shape');
insert into layout (id, name, description) values (3, 'BOARD', 'Board Meeting');
create table room (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(150), 
    PRIMARY KEY (id)
);

create table roomlayout (
	roomid INT  NOT NULL,
	layoutid INT NOT NULL ,
	capacity INT  
);
insert into room (id, name, location) values (1, "Blue meeting Room", "1st Floor");
insert into roomlayout (roomid, layoutid, capacity) values (1,3, 8);
insert into roomlayout (roomid, layoutid, capacity) values (1, 1, 16);


insert into room (id, name, location) values (2, "Red meeting Room","2nd Floor");
insert into roomlayout (roomid, layoutid, capacity) values (2,3, 12);
insert into roomlayout (roomid, layoutid, capacity) values (2, 21, 26);

insert into room (id, name, location) values (3, "Main Conference Room","1st Floor");
insert into roomlayout (roomid, layoutid, capacity) values (3,1, 80);
insert into roomlayout (roomid, layoutid, capacity) values (3, 2, 40);

create table booking (
	id INT NOT NULL AUTO_INCREMENT,
	room VARCHAR(50) NOT NULL,
	user VARCHAR(150),
	layout VARCHAR(50) NOT NULL,
	title VARCHAR(150),
	bookingdate DATE,
	startTime TIME,
	endTime TIME,
	participants INT,
    PRIMARY KEY (id)
);
insert into booking (id, room, user, layout, title,	bookingdate , startTime, endTime, participants) 
values (1,1,2,2,'Conference call with CEO', '2020-10-16', '11:00:00', '11:30:00', 8);

insert into booking (id, room, user, layout, title,	bookingdate , startTime, endTime, participants) 
values (2,2,2,3,'Sales Update', '2020-10-16', '13:00:00', '14:30:00', 5);


SELECT b.id, r.name, u.username,l.description, 
b.title, b.bookingdate,b.startTime,b.endTime,b.participants FROM 
my_db.booking b, room r, users u, layout l
where b.room = r.id and  b.user = u.id and b.layout = l.id;