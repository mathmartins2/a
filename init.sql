INSERT INTO nome_do_banco.users
(id, full_name, email, password, created_at, updated_at)
VALUES('2f6db0f8-a596-49f9-a5c3-cf09bc08ce90', 'Alma Bogisich', 'Clint_Lowe@yahoo.com', '$scrypt$n=16384,r=8,p=1$vJbb8za4vBDNKe6ByBcQKg$6BadFCKvSXbh2ZUdoQIA5ebCf4DHtDXlLN2sc0Lb6bNNqFusV1nPMR/lcBXmGWZcyyZbX9EvQ7VKizoDwxrwEw', '2024-04-18 19:26:53', '2024-04-18 19:26:53');

INSERT INTO nome_do_banco.products
(id, name, price, quantity, created_at, updated_at, deleted_at)
VALUES('09babf7a-5a6e-40d6-8183-40cbe4a09205', 'Awesome Cotton Shoes', 536.00, 1, '2024-04-18 20:33:44', '2024-04-18 20:33:44', NULL);

INSERT INTO nome_do_banco.customers
(id, full_name, cpf, email, phone, address, created_at, updated_at)
VALUES('311e6480-2105-4a24-8440-c07bd407dccc', 'Rice, Parisian and Swaniawski', '591.616.839-06', 'Reva_Wilkinson43@hotmail.com', NULL, NULL, '2024-04-18 19:34:40', '2024-04-18 19:34:40');