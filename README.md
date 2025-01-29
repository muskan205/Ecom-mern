# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

##how to run migation

1. create a entity or modifythe entity
2. Create a migration

# npx typeorm migration:create src/migrations/AddNewEntity

3. Run the migrations

# npm run migrate

npm run migrate

## husky setup

## before pusing the code all pending migrations ran automatically

npx husky-init

##code format
1.install # npm install --save-dev prettier

2.npm run format


##how to push ur code