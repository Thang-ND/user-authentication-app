# This is a basic user authentication web app.

## Step 1: create mysql using docker

**1. Pull MySQL Image**
```bash
docker pull mysql
```
**2. Run MySQL Container**
```bash
docker run -p 3306:3306 --name mysql-auth-app -e MYSQL_ROOT_PASSWORD=Mysql@*#2024 -d mysql
```
**3. Login**
```bash
docker exec -it mysql-auth-app mysql -u root -p'Mysql@*#2024'
```
**4. Create database**
```bash
create database user_management;
```
**5. Create table user**
```bash
use user_management;

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
```

## Step 2: Run backend
**1. Install requirements**
```bash
cd backend
pip install -r requirements.txt
```
**2. Start backend**
```bash
cd app
fastapi dev main.py
```

## Step 3: Run frontend
**1. Install requirements**
```bash
cd frontend
cd auth-app
npm install
```
**2. Start frontend**
```bash
npm start
```
