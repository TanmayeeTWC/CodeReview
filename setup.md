# How-to: create a brand-spankin-new Playwright project
This guide will walk you thru the setup of a brand new playwright project for automated testing. 

## Pre-requsites
- VS code
- Playwright Test for VSCode extension
- git
- node + npm

## Step 1: create a folder and npm project locally
1. Figure out where locally you want the test code to live. For the purposes of this walkthru, we will use `c:\code\my-playwright-project`. We will refer to this as the **base directory**. It should be an empty folder to start. 
2. Open a terminal
3. `cd` into the **base directory**: `cd c:\code\my-playwright-project`
4. Create an npm project in the **base directory** by executing this command: `npm init -y`
5. This will create a `package.json` file - optionally modify as needed for project metadata, but it is fine if we leave this untouched after it is generated.


## Step 2: open the project in VS code and install Playwright
1. Open VS Code
2. Start a new project by opening the **base directory** within VS Code
3. You should see 1 file: `package.json`
4. Open the Command Palette via `View -> Command Palette` or `Ctrl+Shift+P`
5. In the Command Palette near the top, type `Install Playwright` and select the option that appears named `Install Playwright`. If you do not see this command, you will need to install the VS extension mentioned in Pre-Requsites 
6. Check `Use Javascript`, uncheck `Add Github Actions Workflow`, then press `OK`
7. You should see the terminal near the bottom do a bunch of stuff, with the last line being `Happy hacking! 🎭` if successful 
8. To test the install, you can run this command in the same terminal that you saw the above message in: `npx playwright test`


## Step 3: remove example tests
1. Remove the folder `/tests-examples`: we dont need those
2. For now, we will keep the example test in `/tests`, but once you have an application-specific test written, it is highly recommended you remove the file `./tests/example.spec.js` 


## Step 4: (optional) Install dotenv
dotenv is used to allow for a configuration file that can be read as environment variables within tests. it is recommended if you have any need for test-wide variables, such as base urls or usernames. 

1. From within VS code, open a terminal (or any terminal that is in the **base directory**)
2. Run the command: `npm install dotenv --save-dev` 
3. Create 2 files within the **base directory**: `.env` and `.env.example`. 
4. Add any variables you may need to these files, or add a placeholder such as `FOO=BAR`. 
5. Open `.gitignore` and add `.env` to the bottom of it  
6. Open `playwright.config.js` and replace line 8-ish which is commented out: 
`//require('dotenv').config({ path: path.resolve(__dirname, '.env') });`
with
`require('dotenv').config();`

## Step 5: (optional) git-ify 
1. From a terminal within the **base directory**, run the command `git init`
2. Add all the files: `git add *`
3. Commit this initial revision `git commit -a -m "initial commit"` 
4. Open GitHub and create a new repository. For the sake of this walkthru, we will pretend this repo is called `myrepo`
5. Once the repo is created, github will provide you an HTTPS url that looks something like this: `https://github.com/derek/myrepo.git`. We will call this the **git url**
6. Return to the terminal within the **base directory**
7. Run the command `git remote add origin <git url>`, replacing `<git url>` with the url mentioed in step 5. 
8. Run the command `git push --set-upstream origin master`
