CREATE TABLE `users` (
   `id` int NOT NULL AUTO_INCREMENT,
   `username` varchar(50) NOT NULL,
   `email` varchar(100) NOT NULL,
   `password` varchar(100) NOT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY `unique_email` (`email`),
   UNIQUE KEY `unique_username` (`username`)
 );