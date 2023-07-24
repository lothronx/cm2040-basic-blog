##  Coursework Template ##
### CM2040 Database Networks and the Web ###

#### Installation requirements ####

* NodeJS 
    - follow the install instructions at https://nodejs.org/en/
    - we recommend using the latest LTS version
* Sqlite3 
    - Windows users: follow instructions here https://www.sqlitetutorial.net/download-install-sqlite/
    - Mac users: it comes preinstalled
    - Linux users: use a package manager eg. apt install

To install all the node packages run ```npm install``` from the project directory

#### Help with node SQLite3 ####

A few aspects SQLite3 work a little differently to mySql but all of the key concepts are the same

Find the API documentation at:
https://github.com/TryGhost/node-sqlite3/wiki/API

Find node SQLite tutorials at:
https://www.sqlitetutorial.net/sqlite-nodejs/
This also a good resource to find examples and tutorials around SQLite queries


#### Using this template ####

This template sets you off in the right direction for your coursework. To get started:

Run ```npm run build-db``` to create the database (database.db)
Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)

You can also run: 
```npm run clean-db``` to delete the database before rebuilding it for a fresh start

##### Next steps #####

* Explore the file structure and code
* Read all the comments
* Try accessing each of the routes via the browser - make sure you understand what they do
* Try creating ejs pages for each of the routes that retrieve and display the data
* Try enhancing the ```create-user-record``` page so that you can set the text in the record 
* Try adding new routes and pages to let the user create their own records

##### Creating database tables #####

* All database tables should created by modifying the db_schema.sql 
* This allows us to review and recreate your database simply by running ```npm run build-db```
* Do NOT create or alter database tables through other means


#### Preparing for submission ####

Make a copy of this folder
In your copy, delete the following files and folders:
    * node_modules
    * .git (the hidden folder with your git repository)
    * database.db (your database)

Make sure that your package.json file includes all of the dependencies for your project NB. you need to use the ```--save``` tag each time you use npm to install a dependency

#### Getting started with my project ####

No additional configuration is required. 
The environment variable is already set in the .env file.

##### The link to each page is listed below:

*Reader*:

Reader - Home Page: http://localhost:3000/

Reader - Article Page: http://localhost:3000/articles:id, for example, http://localhost:3000/articles/1

*Auth*:

Auth - Register Page: http://localhost:3000/auth/register

Auth - Login Page: http://localhost:3000/auth/login

*Author*:

Author - Home Page: http://localhost:3000/admin

Author - Edit Article Page: http://localhost:3000/admin/articles/:id, for example, http://localhost:3000/admin/articles/3

Author - New Draft Page: http://localhost:3000/admin/articles/new

Author - Settings Page: http://localhost:3000/admin/settings

##### The user authorization flow is as follows:

1. Everything in the /admin endpoints needs authorized access.

2. When starting the app with an empty database, clicking the "Admin" button on the home page will direct the user to the register page to set a password. The password only needs to be set once. It will be stored in the database.

3. After the password is set, when the user clicks the "Admin" button on the home page, they will be directed to the login page. The register page can also redirect the user to the login page.

4. After logging in, the login page will redirect the user to the admin homepage where they can reach all admin pages.

5. The user will remain logged in until they close the Node.js process. When the logged-in user clicks the "Admin" button on the home page, they will be directed to the admin homepage directly.
