
INSERT INTO department (dept_name)
     VALUES ('Sales'),
      ('Engineering'), 
      ('Finance'), 
      ('Legal');

INSERT INTO roles (title, salary, department_id)
    VALUES ('Sales lead', 100000, 1),
     ('Salesperson', 80000, 1), 
     ('Lead Engineer', 150000, 2),
     ('Software Engineer', 120000, 2),
     ('Account Manager', 160000, 3),
     ('Accountant', 125000, 3),
     ('Legal Team Lead', 250000, 4),
     ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
     VALUES ('John', 'Smith', 1, NULL),
     ('Tanya', 'Ruberic', 2, 1),
     ('Sonya', 'Moldova', 2, 1),
     ('Pratik', 'Kkafas', 3, NULL),
     ('Rea', 'Queen', 4, 4),
     ('Donatella', 'Versace', 5, NULL),
     ('Virgil', 'Abloh', 6, 5),
     ('Camille', 'Howe', 7, NULL),
     ('Abdul', 'Walla', 8, 8);
