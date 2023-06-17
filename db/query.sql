-- joi employee(with itself into manager) then with role and then with department

Use employee;

Select e.id, e.first_name, e.last_name, role.title, department.name As department_name, role.salary, CONCAT(m.first_name,'', m.last_name) AS manager_name
From employee e
Left Join employee m ON e.manager_id=m.id
Join role ON e.role_id=role.id
Join employee.department ON role.department_id=department.id;

Select role.id, role.title, role.salary, department.name
From role
Join department ON department.id = role.department_id;