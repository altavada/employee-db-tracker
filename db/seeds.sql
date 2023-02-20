INSERT INTO department (name)
VALUES  ("Marketing"),
        ("R&D"),
        ("Internal Affairs"),
        ("Manufacturing"),
        ("Logistics"),
        ("Legal"),
        ("Accounting"),
        ("Board of Directors");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Marketing Chief", 100000, 1),
        ("Engineer", 80000, 2),
        ("Project Manager", 90000, 2),
        ("Machinist", 60000, 4),
        ("HR Representative", 60000, 3),
        ("Foreman", 70000, 4),
        ("Shipping Coordinator", 80000, 5),
        ("Attorney", 100000, 6),
        ("CPA", 80000, 7),
        ("Data Analyst", 60000, 7),
        ("Online Marketing Specialist", 70000, 1),
        ("Warehouse Worker", 50000, 5),
        ("Arbitrator", 70000, 3),
        ("CEO", 140000, 8),
        ("Paralegal", 70000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mickey", "Mouse", 14, null),
        ("Porky", "Pig", 1, 1),
        ("Donald", "Duck", 3, 1),
        ("Daffy", "Duck", 6, 1),
        ("Minnie", "Mouse", 9, 1),
        ("Bugs", "Bunny", 13, 1),
        ("Elmer", "Fudd", 7, 1),
        ("Goofy", "Goof", 4, 4),
        ("Pepe", "LePew", 11, 2),
        ("Tweety", "Bird", 10, 5),
        ("Road", "Runner", 5, 6),
        ("Wile E.", "Coyote", 2, 3),
        ("Foghorn", "Leghorn", 12, 6),
        ("Speedy", "Gonzales", 8, 1),
        ("Sylvester", "Cat", 15, 14);
