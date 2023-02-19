INSERT INTO department (name)
VALUES  ("Marketing"),
        ("R&D"),
        ("Internal Affairs"),
        ("Manufacturing"),
        ("Logistics"),
        ("Legal"),
        ("Accounting");

INSERT INTO employee_role (title, salary, department_id)
VALUES  ("Marketing Chief", 100000, 1),
        ("Engineer", 80000, 2),
        ("Project Manager", 90000, 2),
        ("Machinist", 60000, 4),
        ("HR Representative", 60000, 3),
        ("Foreman", 70000, 4),
        ("Shipping Coordinator", 80000, 5),
        ("Advisor", 90000, 6),
        ("CPA", 80000, 7),
        ("Data Analyst", 60000, 7),
        ("Online Marketing Specialist", 70000, 1),
        ("Warehouse Worker", 50000, 5),
        ("Arbitrator", 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mickey", "Mouse", 1, null),
        ("Donald", "Duck", 3, null),
        ("Daffy", "Duck", 6, null),
        ("Minnie", "Mouse", 9, null),
        ("Bugs", "Bunny", 13, null),
        ("Elmer", "Fudd", 7, null),
        ("Goofy", "Goof", 4, 3),
        ("Pepe", "LePew", 11, 1),
        ("Tweety", "Bird", 10, 4),
        ("Road", "Runner", 5, 5),
        ("Wile E.", "Coyote", 2, 2),
        ("Foghorn", "Leghorn", 12, 6);
