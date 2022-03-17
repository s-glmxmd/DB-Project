select * from  branch, employee where employee.managerId = branch.managerId;

select * from branch order by 3;

select * from 
(select public.user.firstname, public.user.lastname, employee.managerid as mID
FROM Employee, public.user
where public.user.id = employee."userId") as S1
INNER JOIN Branch
ON S1.mID = Branch.managerid;


CREATE View GuestListView as 
Select * From RentalAgreement R, Payment P, Property W 
WHERE R.guestID = P.guestID 
And R.propertyID = W.ID 
order by W.branchId, p.guestId;

select * from branch;

select ra.propretyid from rentalagreement ra 
where (select count(*) from 
(select extract (day from generate_series(ra.start_date, ra.end_date, '1 day'::interval)) as aDay)as dates 
where 10 = aDay
order by 1) as isValid;

SELECT * CURRENT_DATE + INTERVAL '1 month' as date;

SELECT aDate
   FROM rentalagreement ra
  WHERE  between ra.start_date, ra.end_date );

select * from rentalagreement ra where 
(select extract(day from ra.startdate) = 10 );


CREATE View Bill as 
Select * From  Pricing P, RentalAgreement R, Payment M, Property W 
WHERE R.guestID= P.guestID And RentalAgreement.propertyID = W.ID ;


