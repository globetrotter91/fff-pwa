# FFF = Football Fan's Friend
This app uses the http://api.football-data.org/ API to show the show the fixtures and standings of the leagues selected by the user.

The user can select one or more leagues and then further chose to see fixtures/standing of a particular league.


# UI LIBRARY
https://bootswatch.com/yeti/
This is based on Bootstrap


# File Structure
    /src/assets             - contains static assets of the application like images
    /src/environments       - contains files useful for setting up environment variables.
    /src/main.ts            - this is where everything begins
    /src/app                - conatins the angular code
        /app.module.ts      - contains App module which has multiple services and components
        /components         - contains components for the app [all components are well documented]
        /services           - conatings injectable services used for db management and API calls.
        /models             - contains models used at various places in the application.


# Dependencies
    Angular 4 
    rxJs
    nodeJs


## Development server
    1. Clone the repo

    2. cd to repo

    3. npm install

    4. ng serve for a dev server. Navigate to `http://localhost:4200/`.


## Build
    Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Running unit tests
    Run `ng test` to execute the unit tests


## TODO
    0. Complete the home page with custom news feed.

    1. Implement the service worker.

    2. Create more strong types for variables used.
    
    3. Complete the tests