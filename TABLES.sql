set search_path TO public; -- This doesn't work for User table.. not sure why

CREATE TABLE public.User (ID int,
	firstName VARCHAR(20),
	middleName VARCHAR(20),
	lastName VARCHAR(20),
	emailAddress int,
	phoneNumber int,
	address VARCHAR(20),
	streetName VARCHAR(40),
	city VARCHAR(20),
	province VARCHAR(20),
	PRIMARY KEY(ID));

CREATE TABLE Employee 
	(ID int,
	managerId int,
	position VARCHAR(20),
	salary DECIMAL(6,2),
	PRIMARY KEY(ID));
ALTER TABLE Employee ADD FOREIGN KEY(managerId) REFERENCES employee;

CREATE TABLE Guest 
	(ID int,
	PRIMARY KEY (ID));

CREATE TABLE Branch 
	(ID int,
	managerId int,
	country VARCHAR(20),
	PRIMARY KEY (ID),
	FOREIGN KEY (managerId) REFERENCES Employee);
	

CREATE TABLE Host 
	(ID int,
	PRIMARY Key (ID));
	
CREATE TABLE Property 
	(ID int,
	hostID int,
	branchID int,
	streetNumber int,
	streetName VARCHAR(40),
	city VARCHAR(20),
	proximityToAttactions DECIMAL(3,2),
	PRIMARY KEY(ID),
	FOREIGN KEY(hostID) REFERENCES Host,
	FOREIGN KEY(branchID) REFERENCES Branch);

CREATE TABLE Review 
	(ID int,
	guestID int,
	propretyID int,
	rating DECIMAL(1),
	communication VARCHAR(20),
	cleaniness VARCHAR(20),
	PRIMARY KEY (ID),
	FOREIGN KEY(guestID) REFERENCES Guest,
	FOREIGN KEY(propretyID) REFERENCES Property);

CREATE TABLE Pricing 
	(hostID int,
	propretyID int,
	price DECIMAL(6,2),
	numberOfGuests int,
	homeType VARCHAR(40),
	rules VARCHAR(20),
	amenaties VARCHAR(200),
	FOREIGN KEY (hostID) REFERENCES Host,
	FOREIGN KEY (propretyID) REFERENCES Property);

CREATE TABLE RentalAgreement 
	(ID int,
	propretyID int,
	guestID int,
	signing VARCHAR(20),
	startDate VARCHAR(20),
	endDate VARCHAR(20),
	PRIMARY KEY (ID),
	FOREIGN KEY (propretyID) REFERENCES Property,
	FOREIGN KEY (guestID) REFERENCES Guest);

CREATE TABLE Payment 
	(guestID int,
	rentalAgreementID int,
	paymentType VARCHAR(20),
	paymentAmount DECIMAL(6,2),
	paymentStatus VARCHAR(20),
	discount DECIMAL(3,2),
	FOREIGN KEY (guestID) REFERENCES Guest,
	FOREIGN Key (rentalAgreementID) REFERENCES RentalAgreement);
