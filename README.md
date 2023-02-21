# Employee Database CLI
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Description
This application is a Node.js-based command line interface allowing the user to view and modify data from a relational database built with MySQL. The program utilizes several Node packages -- Express.js to handle middleware and bad requests, console.table to format SQL data output, mysql2 to communicate with the SQL database, and Inquirer to handle command line prompts. [Click here](https://watch.screencastify.com/v/Lb2Jkfz5AjujsZ1k66we) to watch a demo video of the program in action.
## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributors](#contributors)
5. [Questions](#questions)
# Installation
First, you will need to have the project folder on your local system. You will also want to have MySQL installed and set up. Next, navigate to the parent directory via your command line and enter 'npm install' to get the necessary node modules. Then, navigate to the 'db' folder and start MySQL in your command line. You will need to run 'schema.sql' first and then 'seeds.sql,' using the SOURCE keyword followed by the file name. Once this is done, exit MySQL and return to the parent folder. Then, enter 'node server.js' in your command line to initiate the program.
# Usage
Once the program is initiated, you'll be presented with a menu of options which you can select with arrow keys and ENTER. If you are adding or updating data, a further series of prompts will require you to enter said data either by typing or selecting options from a list.  Each prompt requires an input. Leaving any prompt blank will return you to the main menu. To end the application, select 'Exit' from the main menu.
# License
The MIT License
# Contributors
N/A
# Questions
GitHub username: altavada -- Email address: sam.tomaka@gmail.com