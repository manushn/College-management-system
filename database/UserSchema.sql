create database nicetech;
use nicetech;
create table users(
	username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL
)
select * from users;

