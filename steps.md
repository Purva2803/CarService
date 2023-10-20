# here's what you need


## 1. install 
- you can install it from it's official site https://www.postgresql.org/download/ , according your sstem requirements you can follow the steps
- you have to install node js for run time environment , you can install it from here https://nodejs.org/en/download
- you can download postman on your device from here https://www.postman.com/downloads/ for api testing




## 2. setup
- for postgres you need to create one password (remember that pasword) and default it has database created as postgres , also you have to choose a port number where your process is running by default it is 5432 and user also as postgres
- for node js first you need to do `npm install` which installs node modules , helps to running the script
- if you have install `nodemon` than use `npm start` otherwise use `node index` to start the server


## 3. testing of the apis
- after exporting the collection in your postman you can test it by replacing the variable with `http://localhost:3000`
- we are creating an user manually so after starting server go to your pgAdmin and execute this SQL statement 
 "INSERT INTO "User" (user_id, user_name)
  VALUES (1, 'purva');"

- and use this user_id for any apis whenever needed