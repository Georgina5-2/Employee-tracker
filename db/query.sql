-- joi employee(with itself into manager) then with role and then with department

Select e.id e.first_name,e.last_name,role.title,department.name As departmetn_name, role.salary, CONCAT(m.first_name,'', m.last_name) AS manager_name
From employee e
Left Join employee m ON e.manager_id=m.id
Join role ON e.role_id=role.id
Join employees_db.department ON role.department_id=department.id;

--join with department
Select role.id, role.title, role.salary, department.name
From role
Join department ON department.id = role.department_id;