INSERT INTO position_to_wage(position, wage)
VALUES 
    ('cashier', 12.50),
    ('warehouse stocker', 14.00),
    ('supervisor', 16.00),
    ('assistant manager', 20.00),
    ('store manager', 25.00);


INSERT INTO employees(eid, phone_number, name, address, position)
VALUES 
    (DEFAULT, '6042223333', 'John Smithie', '3241 West Broadway, Vancouver', 'cashier'),
    (DEFAULT, '6042223333', 'Nathan Smithie', '3241 West Broadway, Vancouver', 'cashier'),
    (DEFAULT, '7780651651', 'Tiffanie Puast', '311 Granville Ave, Vancouver', 'cashier'),
    (DEFAULT, '7786516844', 'George Canas', '1451 Minory Blvd, Richmond', 'supervisor'),
    (DEFAULT, '6046687784', 'Cathie Kee', '15-1422 W 15th Ave', 'warehouse stocker'),
    (DEFAULT, '7786516128', 'Jason Gaer', '355 Kerasst St, Burnaby', 'warehouse stocker'),
    (DEFAULT, '6048879798', 'Haga Jisuet', '8774 Lipton Ave, Surrey', 'assistant manager'),
    (DEFAULT, '6048777487', 'Landon Garuwee', '827 Northanium Rd, Vancouver', 'store manager');

INSERT INTO branches(bid, address, phone_number)
VALUES  
    (DEFAULT, '4144 Blundell Rd, Richmond', '7786274513'),
    (DEFAULT, '780 No 3 Rd, Richmond', '6047781578'),
    (DEFAULT, '798 W 13th Ave, Vancouver', '6047781475'),
    (DEFAULT, '79 Main St, Vancouver', '7786514788');

INSERT INTO works_at(eid, bid)
VALUES 
    (1,1),
    (1,2),
    (2,2),
    (3,1),
    (4,2),
    (5,3),
    (6,4),
    (7,1);

INSERT INTO customers(cid, address, email, name, points, registration_date, phone_number, password, is_blacklisted)
VALUES
    /* Password is 123 */
    (DEFAULT, '2205 Lower Mall', 'hello@mellie.dev', 'Mellie Vo', 0, '2021-03-25', '1234567890', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', false),
    /* Password is agaiutans */
    (DEFAULT, '122 Walter Hardwick Ave 305 Vancouver', 'smithw@hotmail.com', 'Wayne Smith', 780, '2012-07-25', '6047781478', 'f70612557ff50ea691de39e22c15205530af7ea19295234ab0fcdc53f202168c', false),
    /* Password is 14qtgas */
    (DEFAULT, '3308 Ash St Vancouver BC V5Z 3E3 Vancouver ', 'agawrg@hotmail.com', 'Annie Gawrg', 100, '2020-07-25', '7787781478', '8d8e12f55fd75258df0f96ffb0cf97bad094ac6844e021b9e6958dc6bd6feed7', false),
    /* Password is 14gas34 */
    (DEFAULT, '2485 Broadway W 414 Vancouver', 'laurage@hotmail.com', 'Laura Gerner', 470, '2012-07-25', '6047924784', 'dbd83b6fb86597450f1d00879c0a46a9bf3e8989f741df127b03908b226e5a58', true),
    /* Password is 78022atq */
    (DEFAULT, '275 28th Ave E Vancouver', 'Jordansq@hotmail.com', 'Jordan Saaw', 148, '2012-07-25', '7786459874', '97a789d6d464e4667878d8b6043cda102ba27026a128c3aaf4b11a1725037310', false),
    /* Password is asgqertqfza */
    (DEFAULT, '563 Union St Vancouver', 'eeaqt@hotmail.com', 'Eden Eath', 987, '2012-07-25', '7780146777', '6c323dcd4daaabc38a40a138ae31c994a7147f9828b40500d6df2890bacfa553', false),
    /* Password is agwrqgagg */
    (DEFAULT, '3007 8th Ave W Vancouver', 'saraga@hotmail.com', 'Sara Goon', 725, '2012-07-25', '6041000102', 'dfc945fd15988da66959c6350e2bb3eeaf0e3a813c82624844aa542d4130217b', false);

INSERT INTO fines_accrued_by(fid, cid, date, strike)
VALUES  
    (DEFAULT, 2, '2020-04-21', 1),
    (DEFAULT, 2, '2020-09-01', 2),
    (DEFAULT, 6, '2014-11-11', 1),
    (DEFAULT, 4, '2012-11-05', 1),
    (DEFAULT, 4, '2017-02-14', 2),
    (DEFAULT, 4, '2019-08-01', 3);

INSERT INTO couriers(nid, name)
VALUES 
    (DEFAULT, 'Canada Post'),
    (DEFAULT, 'Intelcom'),
    (DEFAULT, 'UPS'),
    (DEFAULT, 'Fedex'),
    (DEFAULT, 'USPS');

INSERT INTO packages(pid, cid, bid, eid, nid, tracking_number, processed_date, ordered_date)
VALUES
    (DEFAULT, 2, 1, 1, 3, 'AGWT305122251', '2020-01-02', '2019-12-22'),
    (DEFAULT, 2, 1, 4, 2, '30512AAGT2784', '2020-01-02', '2019-12-27'),
    (DEFAULT, 2, 1, 4, 3, 'SGUXW61595992', '2012-04-30', '2012-03-02'),
    (DEFAULT, 3, 3, 1, 2, 'GTIQ515975666', '2018-07-22', '2018-06-22'),
    (DEFAULT, 4, 3, 2, 4, 'PLIGNS5862601', '2020-09-07', '2020-09-04'),
    (DEFAULT, 4, 2, 3, 5, 'POJEM99935178', '2020-09-26', '2020-09-22'),
    (DEFAULT, 4, 1, 1, 1, 'ZGAGGG88151AA', '2020-12-02', '2020-12-01'),
    (DEFAULT, 5, 4, 5, 3, 'OGIHG66408462', '2014-11-06', '2014-11-04'),
    (DEFAULT, 4, 1, 1, 4, '650416GITNS04', '2016-07-27', '2016-07-04'),
    (DEFAULT, 3, 4, 2, 3, 'SGSHO26620751', '2014-11-30', '2014-11-12'),
    (DEFAULT, 4, 4, 2, 3, 'GAJNG20671067', '2012-05-05', '2012-05-01'),  
    (DEFAULT, 4, 4, 2, 3, '3687GAODG8702', '2017-07-14', '2017-07-04'),
    (DEFAULT, 4, 4, 2, 3, 'TGE927515NGG1', '2019-02-01', '2019-01-11'),
    (DEFAULT, 5, 2, 4, 4, '15LAKGNL15156', '2021-03-01', '2021-02-11'),
    (DEFAULT, 5, 3, 1, 1, '35188AKJN1KK2', '2021-02-15', '2021-02-03'),
    (DEFAULT, 4, 4, 2, 2, '1298475KAJGNL', '2021-02-01', '2021-01-11'),
    (DEFAULT, 5, 4, 2, 2, '782WAGK2851NN', '2021-04-01', '2021-03-18'),
    (DEFAULT, 5, 4, 2, 5, '569ATG3T19586', '2021-03-16', '2021-03-07');


    

INSERT INTO shipments(pid, shipping_date, destination_address, weight, recipient_name)
VALUES
    (1, '2020-02-06', '303 621 57th Ave W Vancouver', 5.0, 'Emily Sun'),
    (2, '2020-01-06', '2425 7th Ave W Vancouver ', 4.0, 'George Ponta'),
    (3, '2012-05-01', '2425 7th Ave W Vancouver ', 3.0, 'Leslie Jo'),
    (4, '2018-07-22', '3007 8th Ave W Vancouver ', 6.0, 'Irene Ng'),
    (14, '2021-03-17', '9614 E 55 Ave, Vancouver ', 5.0, 'Irene Ng'),
    (15, '2021-02-15', '3007 8th Ave W Vancouver ', 1.0, 'Irene Ng');


INSERT INTO shipment_bundles(sbid, cid, weight, recipient_name, destination_address, shipping_date, eid, nid)
VALUES
    (DEFAULT, 4, 6.74, 'Nancy Drew', '3007 8th Ave W Vancouver', '2021-02-28', 1, 1),
    (DEFAULT, 4, 1.47, 'Daniel Can', '9614 E 55 Ave, Vancouver', '2020-12-09', 2, 2),
    (DEFAULT, 5, 16.72, 'Morton Ages', '1949 Comox St 305 Vancouver', '2014-11-09', 2, 1),
    (DEFAULT, 3, 8.98, 'Morton Ages', '1949 Comox St 305 Vancouver', '2014-12-09', 3, 1);

INSERT INTO shipment_bundles_to_dispose_of(arrival_date, picked_up, disposed_of)
VALUES
    ('2012-05-05', false, true),
    ('2017-07-14', false, true),
    ('2019-02-01', false, true),
    ('2020-09-07', true, false),
    ('2021-02-26', true, false),
    ('2020-12-02', true, false),
    ('2014-11-06', true, false),
    ('2014-11-30', true, false),
    ('2016-07-27', true, false);


INSERT INTO shipment_bundles_contains_storage(pid, sbid, arrival_date, picked_up)
VALUES
    (5, 1, '2020-09-07', true),
    (6, 1, '2021-02-26', true),
    (7, 1, '2020-12-02', true),
    (8, 1, '2014-11-06', true),
    (9, NULL, '2016-07-27', true),
    (10, 1, '2014-11-30', true),
    (11, NULL, '2012-05-05', false),
    (12, NULL, '2017-07-14', false),
    (13, NULL, '2019-02-01', false);

INSERT INTO courier_branch_is_store_of_courier(nbid, nid, phone_number, address, discount_per_lb)
VALUES
    (DEFAULT, 1, '7786487984', '1151 Lower Mall, Vancouver', 1.51),
    (DEFAULT, 2, '7789471102', '122 Walter Hardwick Ave 305 Vancouver ', 1.14),
    (DEFAULT, 1, '7783149733', '3308 Ash St Vancouver', 0.51),
    (DEFAULT, 3, '7784783858', '2485 Broadway W 414 Vancouver', 1.10),
    (DEFAULT, 4, '6047841154', '275 28th Ave E Vancouver', 0.70),
    (DEFAULT, 1, '6041112141', '106 588 45th Ave W Vancouver', 1.11),
    (DEFAULT, 2, '6048797987', '563 Union St Vancouver', 1.00);

INSERT INTO drop_off_points(nbid, bid)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (2,1),
    (3,3),
    (4,4),
    (5,2),
    (6,1);

INSERT INTO shipped_by(eid, pid)
VALUES
    (1,1),
    (1,2),
    (3,3),
    (2,4);






    


    
    