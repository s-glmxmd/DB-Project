-- For windows this website might help you run postgres from terminal: https://help.theatremanager.com/book/export/html/1666
-- not exactly sure how to do it in windows tho :(( if you're having issues lemme know and I will help

-- For MacOSX follow instructions below:
-- NOTE: you need homebrew installed on your computer (not sure)
-- Run in your terminal:    brew services start postgres
--                          psql postgres
--                          then run the first line
--                          use (\c group_104) to change into the newly created database 
--                          then run each of the create table lines

CREATE DATABASE group_104 WITH OWNER = postgres;

CREATE TABLE public.user(id SERIAL PRIMARY KEY,firstname character varying(20) ,middlename character varying(20) ,lastname character varying(20)  ,emailaddress character varying(40),phonenumber bigint,user_address character varying(20)  ,streetname character varying(40)  ,city character varying(20)  ,province character varying(20));

CREATE TABLE public.host(id SERIAL PRIMARY KEY,userFk integer,CONSTRAINT user_host_fk FOREIGN KEY (userFk) REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE public.guest(id SERIAL PRIMARY KEY,userFk integer,CONSTRAINT user_guest_fk FOREIGN KEY (userFk) REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE public.employee(id SERIAL PRIMARY KEY, managerId SERIAL, position character varying(20), salary numeric(6, 2), userFk integer,CONSTRAINT user_employee_fk FOREIGN KEY (userFk) REFERENCES public."user" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT employee_manager_fk FOREIGN KEY (managerId) REFERENCES public."employee" (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE public.branch(id SERIAL PRIMARY KEY, managerid SERIAL, country character varying(20), branchname character varying(20), CONSTRAINT branch_managerid_fkey FOREIGN KEY (managerid) REFERENCES public."employee" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

CREATE TABLE public.property(id SERIAL PRIMARY KEY, hostid SERIAL, branchid SERIAL, streetnumber integer, streetname character varying(40), city character varying(40), proximitytoattractions numeric(3,2), CONSTRAINT property_branchid_fkey FOREIGN KEY (branchid) REFERENCES public."branch" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT property_hostid_fkey FOREIGN KEY (hostid) REFERENCES public."host" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

CREATE TABLE public.rentalagreement(id SERIAL PRIMARY KEY, propertyid SERIAL, guestid SERIAL, signing character varying(20), startdate DATE, enddate DATE, CONSTRAINT rentalagreement_guestid_fkey FOREIGN KEY (guestid) REFERENCES public."guest" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT rentalagreement_propretyid_fkey FOREIGN KEY (propertyid) REFERENCES public."property" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

CREATE TABLE public.pricing( hostid SERIAL, propertyid SERIAL, price numeric(6,2), numberofguests integer, hometype character varying(40), rules character varying(20), amenaties character varying(200), CONSTRAINT pricing_pkey PRIMARY KEY (hostid, propertyid),  CONSTRAINT pricing_hostid_fkey FOREIGN KEY (hostid) REFERENCES public."host" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT pricing_propretyid_fkey FOREIGN KEY (propertyid) REFERENCES public."property" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

CREATE TABLE public.payment( guestid SERIAL, rentalagreementid SERIAL, paymenttype character varying(20), paymentamount numeric(6,2), paymentstatus character varying(20), discount numeric(3,2), CONSTRAINT payment_pkey PRIMARY KEY (guestid, rentalagreementid), CONSTRAINT payment_guestid_fkey FOREIGN KEY (guestid) REFERENCES public."guest" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT payment_rentalagreementid_fkey FOREIGN KEY (rentalagreementid) REFERENCES public."rentalagreement" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

CREATE TABLE public.review( id SERIAL PRIMARY KEY, guestid SERIAL, propertyid SERIAL, rating numeric(1,0), communication character varying(20), cleaniness character varying(20), CONSTRAINT review_guestid_fkey FOREIGN KEY (guestid) REFERENCES public."guest" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT review_propertyid_fkey FOREIGN KEY (propertyid) REFERENCES public."property" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION);

-- Query 1

-- Query 2
CREATE View GuestListView as Select * from public.user U JOIN (SELECT G.userfk from  RentalAgreement R, Payment P, Property W, Guest G  where R.guestid = P.guestid and R.propertyid = W.id and G.id = R.guestid order by W.branchid, P.guestid) as S on U.id = S.userfk;

-- Query 3

-- Query 4

-- Query 5

-- Query 6

-- Query 7

-- Query 8

-- Query 9

-- Query 10
