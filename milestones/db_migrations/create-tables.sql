CREATE DATABASE project;

USE project;

CREATE TABLE PositionToWage
(
	`position` varchar(255) NOT NULL,
    `wage` FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (`position`)
);

CREATE TABLE Employees
(
	`eid` INT NOT NULL AUTO_INCREMENT,
    `phone_number` INT,
    `name` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    PRIMARY KEY (`eid`),
	UNIQUE KEY name_phone_number_unique(`name`, `phone_number`),
	UNIQUE KEY name_address_unique(`name`, `address`),
    FOREIGN KEY (`position`) REFERENCES PositionToWage(`position`)
);

CREATE TABLE Branches
(
	`bid` INT NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `phone_number` INT NOT NULL,
    PRIMARY KEY (`bid`),
    UNIQUE KEY (`address`),
    UNIQUE KEY (`phone_number`)
);

CREATE TABLE WorksAt
(
	`eid` INT NOT NULL,
    `bid` INT NOT NULL,
    PRIMARY KEY (`eid`, `bid`),
    FOREIGN KEY (`eid`) REFERENCES Employees(`eid`),
    FOREIGN KEY (`bid`) REFERENCES Branches(`bid`)
);

CREATE TABLE Customers
(
	`cid` INT NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `points` INT NOT NULL DEFAULT 0,
    `registration_date` DATE NOT NULL,
    `phone_number` INT NOT NULL,
    `password` BINARY(32) NOT NULL,
    `is_blacklisted` BOOL NOT NULL DEFAULT false,
    PRIMARY KEY (`cid`),
	UNIQUE KEY (`email`),
	UNIQUE KEY name_address_unique(`name`, `address`),
	UNIQUE KEY name_phone_number_unique(`name`, `phone_number`)
);

CREATE TABLE FinesAccruedBy
(
	`fid` INT NOT NULL AUTO_INCREMENT,
    `cid` INT NOT NULL,
    `date` DATE NOT NULL,
    `strike` INT NOT NULL,
    PRIMARY KEY (`fid`, `cid`),
    FOREIGN KEY (`cid`) REFERENCES Customers(`cid`)
);

CREATE TABLE Couriers
(
	`nid` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`nid`)
);

CREATE TABLE Packages
(
    `pid` INT NOT NULL AUTO_INCREMENT,
    `cid` INT NOT NULL,
    `bid` INT NOT NULL,
    `eid` INT NOT NULL,
    `nid` INT NOT NULL,
    `tracking_number` varchar(36) NOT NULL,
    `processed_date` DATE NOT NULL,
    `ordered_date` DATE,
    PRIMARY KEY (`pid`),
    FOREIGN KEY (`cid`) REFERENCES Customers(`cid`),
    FOREIGN KEY (`nid`) REFERENCES Couriers(`nid`),
    FOREIGN KEY (`bid`) REFERENCES Branches(`bid`),
    FOREIGN KEY (`eid`) REFERENCES Employees(`eid`)
);


CREATE TABLE Shipments
(
	`pid` INT NOT NULL,
    `shipping_date` DATE NOT NULL,
    `destination_address` varchar(255) NOT NULL,
    `weight` FLOAT NOT NULL DEFAULT 0,
    `recipient_name` varchar(255) NOT NULL,
    PRIMARY KEY (`pid`),
    FOREIGN KEY (`pid`) REFERENCES Packages(`pid`)
);

CREATE TABLE ShipmentBundles
(
    `sbid` INT NOT NULL AUTO_INCREMENT,
    `cid` INT NOT NULL,
    `weight` FLOAT NOT NULL,
    `recipient_name` varchar(255) NOT NULL,
    `destination_address` varchar(255) NOT NULL,
    `shipping_date` DATE NOT NULL,
    `eid` INT NOT NULL,
    `nid` INT NOT NULL,
    PRIMARY KEY (`sbid`),
    FOREIGN KEY (`cid`) REFERENCES Customers(`cid`),
    FOREIGN KEY (`nid`) REFERENCES Couriers(`nid`),
    FOREIGN KEY (`eid`) REFERENCES Employees(`eid`)

);

CREATE TABLE ShipmentBundlesToDisposeOf
(
    `arrival_date` DATE NOT NULL,
    `picked_up` BOOL NOT NULL DEFAULT false,
    `disposed_of` BOOL NOT NULL DEFAULT false,
    PRIMARY KEY (`arrival_date`, `picked_up`)
);


CREATE TABLE ShipmentBundlesContainsStorage
(
	`pid` INT NOT NULL,
    `sbid` INT NOT NULL,
    `arrival_date` DATE NOT NULL,
    `picked_up` BOOL NOT NULL,
    PRIMARY KEY (`pid`, `sbid`),
    FOREIGN KEY (`pid`) REFERENCES Packages(`pid`),
    FOREIGN KEY (`sbid`) REFERENCES ShipmentBundles(`sbid`),
    FOREIGN KEY (`arrival_date`, `picked_up`) REFERENCES ShipmentBundlesToDisposeOf(`arrival_date`, `picked_up`)
);




CREATE TABLE CourierBranchsIsStoreOfCourier
(
	`nbid` INT NOT NULL AUTO_INCREMENT,
    `nid` INT NOT NULL,
    `phone_number` INT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `discount_per_lb` FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (`nbid`),
    UNIQUE KEY (`phone_number`),
    UNIQUE KEY (`address`)
);

CREATE TABLE DropOffPoints
(
	`nbid` INT NOT NULL,
    `bid` INT NOT NULL,
    PRIMARY KEY (`nbid`, `bid`),
    FOREIGN KEY (`nbid`) REFERENCES CourierBranchsIsStoreOfCourier(`nbid`),
    FOREIGN KEY (`bid`) REFERENCES Branches(`bid`)
);

CREATE TABLE ShippedBy
(
	`eid` INT NOT NULL,
    `pid` INT NOT NULL,
    PRIMARY KEY (`eid`, `pid`),
    FOREIGN KEY (`eid`) REFERENCES Employees(`eid`),
    FOREIGN KEY (`pid`) REFERENCES Packages(`pid`)
);

/* -------------------------------------------------------------------------
 * Migrations Table
 *
 * NOTE: This helps with ensuring that we only apply migrations if we need to
 *       Checking for this table isn't needed in this script as if the database 
 *       the database exists, this script has been run and re-creating the db 
 *       will result in an error
 * ------------------------------------------------------------------------- */
CREATE TABLE Migrations
(
	`migration_id` INT NOT NULL,
    PRIMARY KEY (`migration_id`)
);

INSERT INTO Migrations(`migration_id`) VALUES (0)