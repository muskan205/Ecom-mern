
E-commerce Project
=======================
Overview
This is an e-commerce project currently under development. The project aims to provide a robust and scalable e-commerce platform with features such as:
1. User authentication and authorization
2. Product management
3. Order management
4. Payment gateway integration
#### Admin dashboard for managing users, products, and orders
#### Features
1. Authentication
2. Token-based authentication
3. Role-based authentication (Admin, Seller, and Customer)
4. Forget and reset password functionality
5. Verify OTP functionality
## Admin Module
1. Manage users (CRUD operations)
2. Manage products (CRUD operations)
3. Manage orders (CRUD operations)
4. Manage seller roles and permissions
## Seller Module
1. Manage shop-related functionality
2. Create, update, and delete products
3. Manage orders and inventory
4. Customer Module

## Tech Stack
Node.js
Express.js
TypeScript
TypeORM
PostgreSQL
Prettier
ESLint

### Prerequisites
#### Before you start, ensure you have the following installed:
1. Node.js (version 16 or higher)
2. npm (version 8 or higher)
3. PostgreSQL (version 8.4 or higher)
4. TypeScript (version 4 or higher)
5. Git (version 2 or higher)
#### Setup Instructions
#### To initialize and run the project, follow these steps:
Step 1: Clone the Repository
##### Clone the repository using Git:
Bash
#### git clone https://github.com/your-username/your-repo-name.git
2. Navigate to the project directory:
Bash
### cd your-repo-name
 Step 2: Install Dependencies
1. Install the project dependencies using npm:
Bash
2. npm install
This command will install all the dependencies listed in the package.json file.
Step 3: Create a .env File
### Create a new file named .env in the project root directory:
Bash
touch .env
Add the following environment variables to the .env file:
1. Makefile
  DB_HOST=localhost
  DB_PORT=5432
  DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
##### Replace the placeholder values with your actual database credentials and email settings.
Step 4: Format the Code
Run the following command to format the code using Prettier:
Bash
## npm run format
1. This command will format the code in the project directory.
#### Step 5: Compile the Code
Run the following command to compile the TypeScript code:
Bash
npx tsc
This command will compile the TypeScript code in the project directory.
##### Step 6: Run Migrations
Run the following command to create and run database migrations:
Bash
#### npm run migration
This command will create the necessary database tables and schema.
Step 7: Start the Server
Run the following command to start the server:
Bash
npm start

## Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

### How to run migation

1. create a entity or modifythe entity
2. Create a migration

# npx typeorm migration:create src/migrations/AddNewEntity

3. Run the migrations

# npm run migrate

npm run migrate

## Husky setup
Thi is responsible for making the chnages before commit like formatting,linting ,I have used this for formating 

npx husky-init

### code format
1.install # npm install --save-dev prettier
