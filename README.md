# About 
IsItBetterThere is a platform where people can connect and gather relevant information about what it is like to transition to the next phase of their life from other people's personal experiences. 

# Tooling
First install these tools required for the project:

1. VS code - text editor
2. Git - version control
3. Github - codebase repository
4. Git bash - source control management system
5. NPM - node package module
6. Node.js - javascript runtime environment

# Tech stack
This project is ultimately going to be a CRUD app that utilises secured api routes for creating and fetching data. This project uses the following web technologies: 

## Front-end technologies
1. React.js - A javascript library for building user interfaces
> https://reactjs.org/
2. Next.js - A framework for statically generated and server-rendered react applications (uses Node.js under the hood)
> https://nextjs.org/
3. Redux - A state container for js apps. We'll be using React bindings for redux which is React-redux
> https://redux.js.org/
> https://react-redux.js.org/
4. Material-UI - A UI styling framework for react that follows Google's design language, Material design.
> https://material-ui.com/
5. Styled-components - A styling tool for component based user interfaces (e.g: React, Vue)
> https://styled-components.com/

## Back-end technologies
1. Knex.js - SQL query builder for databases. We'll be using sqlite3 for development environment and postgreSQL (Relational databases) for production environment
> http://knexjs.org/
2. Next-auth - An authentication library for Next.js
> https://next-auth.js.org/
3. Heroku - platform as a service

# Set up a local working environment
1. Create a folder in your pc where you want the project to be in.
2. Using git bash, navigate through the folder you just created using `cd <folder name>`. Moving u
> NOTE: If you can't see your folder run the command `ls` in git bash to see where you currently are
> HINT: You can use `cd ..` to move up a directory.
3. Open git bash and run this command: `git clone https://github.com/ricjohn-acosta/isitbetterthere.git`
4. Run `npm install` to install dependencies
5. Run `npm run dev` and check localhost:3000 if it works

# Contribution workflow
Once you have a local working environment set up:

1. In git bash, run the command `git checkout -b dev-<name-of-feature>` to create a new local branch for you to work in.
2. After you've finished making changes in files in your branch run the following commands
   * `git add .` - stage your changes
   * `git commit -m <your message>` - commit your changes
   * `git push origin <current-branch-name>` - push your branch into this repository
3. After you've pushed your branch in this repository, go to the branch you've pushed `(e.g: https://github.com/ricjohn-acosta/isitbetterthere/tree/<your-branch-name>)`, make a pull request and I'll check your work.

# Resources:
Trello: https://trello.com/b/JJfXtDPY/isitbetterthere
