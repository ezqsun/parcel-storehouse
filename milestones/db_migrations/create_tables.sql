CREATE DATABASE cpscdb;

USE cpscdb;

CREATE TABLE position_to_wage
(
	`position` varchar(255) NOT NULL,
    `wage` FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (`position`)
);

CREATE TABLE employees
(
	`eid` INT NOT NULL AUTO_INCREMENT,
    `phone_number` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    PRIMARY KEY (`eid`),
	UNIQUE KEY name_phone_number_unique(`name`, `phone_number`),
	UNIQUE KEY name_address_unique(`name`, `address`),
    FOREIGN KEY (`position`) REFERENCES position_to_wage(`position`)
);

CREATE TABLE branches
(
	`bid` INT NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `phone_number` varchar(255) NOT NULL,
    PRIMARY KEY (`bid`),
    UNIQUE KEY (`address`),
    UNIQUE KEY (`phone_number`)
);

CREATE TABLE works_at
(
	`eid` INT NOT NULL,
    `bid` INT NOT NULL,
    PRIMARY KEY (`eid`, `bid`),
    FOREIGN KEY (`eid`) REFERENCES employees(`eid`),
    FOREIGN KEY (`bid`) REFERENCES branches(`bid`)
);

CREATE TABLE customers
(
	`cid` INT NOT NULL AUTO_INCREMENT,
    `address` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `points` INT NOT NULL DEFAULT 0,
    `registration_date` DATE NOT NULL,
    `phone_number` varchar(255) NOT NULL,
    `password` varchar(64) NOT NULL,
    `is_blacklisted` BOOL NOT NULL DEFAULT false,
    PRIMARY KEY (`cid`),
	UNIQUE KEY (`email`),
	UNIQUE KEY name_address_unique(`name`, `address`),
	UNIQUE KEY name_phone_number_unique(`name`, `phone_number`)
);

CREATE TABLE fines_accrued_by
(
	`fid` INT NOT NULL AUTO_INCREMENT,
    `cid` INT NOT NULL,
    `date` DATE NOT NULL,
    `strike` INT NOT NULL,
    PRIMARY KEY (`fid`, `cid`),
    FOREIGN KEY (`cid`) REFERENCES customers(`cid`)
);

CREATE TABLE couriers
(
	`nid` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`nid`)
);

CREATE TABLE packages
(
    `pid` INT NOT NULL AUTO_INCREMENT,
    `cid` INT NULL,
    `bid` INT NOT NULL,
    `eid` INT NOT NULL,
    `nid` INT NOT NULL,
    `tracking_number` varchar(36) NOT NULL,
    `processed_date` DATE,
    `ordered_date` DATE,
    PRIMARY KEY (`pid`),
    FOREIGN KEY (`cid`) REFERENCES customers(`cid`),
    FOREIGN KEY (`nid`) REFERENCES couriers(`nid`),
    FOREIGN KEY (`bid`) REFERENCES branches(`bid`),
    FOREIGN KEY (`eid`) REFERENCES employees(`eid`)
);


CREATE TABLE shipments
(
	`pid` INT NOT NULL,
    `shipping_date` DATE NOT NULL,
    `destination_address` varchar(255) NOT NULL,
    `weight` FLOAT NOT NULL DEFAULT 0,
    `recipient_name` varchar(255) NOT NULL,
    PRIMARY KEY (`pid`),
    FOREIGN KEY (`pid`) REFERENCES packages(`pid`) ON DELETE CASCADE
);

CREATE TABLE shipment_bundles
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
    FOREIGN KEY (`cid`) REFERENCES customers(`cid`),
    FOREIGN KEY (`nid`) REFERENCES couriers(`nid`),
    FOREIGN KEY (`eid`) REFERENCES employees(`eid`)

);

CREATE TABLE shipment_bundles_to_dispose_of
(
    `arrival_date` DATE NOT NULL,
    `picked_up` BOOL NOT NULL DEFAULT false,
    `disposed_of` BOOL NOT NULL DEFAULT false,
    PRIMARY KEY (`arrival_date`, `picked_up`)
);


CREATE TABLE shipment_bundles_contains_storage
(
	`pid` INT NOT NULL,
    `sbid` INT NULL,
    `arrival_date` DATE NOT NULL,
    `picked_up` BOOL NOT NULL,
    PRIMARY KEY (`pid`),
    FOREIGN KEY (`pid`) REFERENCES packages(`pid`) ON DELETE CASCADE,
    FOREIGN KEY (`sbid`) REFERENCES shipment_bundles(`sbid`),
    FOREIGN KEY (`arrival_date`, `picked_up`) REFERENCES shipment_bundles_to_dispose_of(`arrival_date`, `picked_up`)
);




CREATE TABLE courier_branch_is_store_of_courier
(
	`nbid` INT NOT NULL AUTO_INCREMENT,
    `nid` INT NOT NULL,
    `phone_number` varchar(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `discount_per_lb` FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (`nbid`),
    UNIQUE KEY (`phone_number`),
    UNIQUE KEY (`address`)
);

CREATE TABLE drop_off_points
(
	`nbid` INT NOT NULL,
    `bid` INT NOT NULL,
    PRIMARY KEY (`nbid`, `bid`),
    FOREIGN KEY (`nbid`) REFERENCES courier_branch_is_store_of_courier(`nbid`),
    FOREIGN KEY (`bid`) REFERENCES branches(`bid`)
);

CREATE TABLE shipped_by
(
	`eid` INT NOT NULL,
    `pid` INT NOT NULL,
    PRIMARY KEY (`eid`, `pid`),
    FOREIGN KEY (`eid`) REFERENCES employees(`eid`),
    FOREIGN KEY (`pid`) REFERENCES packages(`pid`) ON DELETE CASCADE
);

/* -------------------------------------------------------------------------
 * Migrations Table
 *
 * NOTE: This helps with ensuring that we only apply migrations if we need to
 *       Checking for this table isn't needed in this script as if the database 
 *       the database exists, this script has been run and re-creating the db 
 *       will result in an error
 * ------------------------------------------------------------------------- */
CREATE TABLE migrations
(
	`migration_id` INT NOT NULL,
    PRIMARY KEY (`migration_id`)
);

INSERT INTO migrations(`migration_id`) VALUES (0)