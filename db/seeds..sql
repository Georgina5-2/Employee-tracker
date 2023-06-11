USE employees_db;

INSERT INTO department(name) VALUES
("Human Resources"),
("Accounting"),
("Marketing"),
("IT");


INSERT INTO role(title,salary,department_id) VALUES
("Recruiter", 70000,1),
("Executive HR", 90000,1),
("Treasurer", 80000,2),
("Financial Auditor", 65000,2),
("Marketing Director", 95000,3),
("Marketing Analyst", 60000,3),
("Network Administrator", 75000,4),
("Full-stack Developer", 80000,4),


INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES
("John","Adams",1,NULL),
("Andrew",Jones", 2,NULL),
("Hayley","Don", 3,NULL),
("Cindy","Williams", 4,NULL),
("Pauline","Edward", 5,NULL),
("Roselin","Johnson", 6,NULL),
("Wesley","Maxwell", 7,NULL),
("Hannah","Cobb", 8,NULL);

UPDATE employee SET manager_id=2 WHERE id=1;
UPDATE employee SET manager_id=4 WHERE id=3;
UPDATE employee SET manager_id=6 WHERE id=5;