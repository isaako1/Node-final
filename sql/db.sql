CREATE TABLE customers (
customer_id SERIAL NOT NULL,
first_name VARCHAR(250),
last_name VARCHAR(250),
credentials_id int NOT NULL,
rentals_id int,
address_id int NOT NULL,
PRIMARY KEY ("customer_id")
);
CREATE INDEX "FK" ON "customers" ("credentials_id", "rentals_id",
"address_id");
CREATE TABLE credentials (
credentials_id SERIAL NOT NULL,
email VARCHAR(250) NOT NULL,
username VARCHAR(250) NOT NULL,
password VARCHAR(250) NOT NULL,
PRIMARY KEY ("credentials_id")
);
CREATE TABLE address (
address_id SERIAL NOT NULL,
street_name VARCHAR(250),
home_num VARCHAR(250),
city VARCHAR(250),
state VARCHAR(250),
country VARCHAR(250),
zip VARCHAR(250),
phone_num VARCHAR(250),
PRIMARY KEY ("address_id")
);
CREATE TABLE rentals (
rentals_id SERIAL NOT NULL,
books_id int,
date_rented DATE,
date_to_return DATE,
PRIMARY KEY ("rentals_id")
);
CREATE INDEX "FK" ON "customers" ("books_id");
CREATE TABLE books (
books_id SERIAL NOT NULL,
book_title VARCHAR(250) NOT NULL,
book_author VARCHAR(250) NOT NULL,
book_isbn VARCHAR(250),
publisher VARCHAR(250),
PRIMARY KEY ("books_id")
);


INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter and the Sorcerer Stone', 'J.K. Rowling', '0590353403', 'Scholastic Press'); 

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', '0439064866', 'Scholastic Press');

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', '0439136369', 'Scholastic Press'); 

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter And The Goblet Of Fire', 'J.K. Rowling', '0439139600', 'Scholastic Press');

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter And The Order Of The Phoenix', 'J.K. Rowling', '0439358078', 'Scholastic Press');

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter and the Half-Blood Prince', 'J.K. Rowling', '0439785960', 'Scholastic Press'); 

INSERT INTO books (book_title, book_author, book_isbn, publisher) 
VALUES ('Harry Potter and the Deathly Hallows', 'J.K. Rowling', '0545139708', 'Scholastic Press'); 