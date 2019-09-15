# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running end to end application

In order to run the end to end application please follow the steps below:

1. Run the Web Application API as a spring boot application using `mvn spring-boot:run`.
2. Provide API host url in `evironment.ts` file.
3. Provide Google map access key in `app.module.ts` file in place of merge field `<APIKEY>`.
3. Run the Angular application using `ng serve`.
4. Navigate to the sign up page using `Sign Up` button.
5. Create a user by filling in the mandatory details including API access key for external weather API (can use `06ed11f3cc0d294f57103663ba82daf0`).
6. Login with the user name and password provided on the sign up page.
7. Fill in the City, Country Code, From and To Date on weather application page and press `Get Weather Details` button.
8. Select an option to save the data in the database or download the information as PDF or plot the current weather information on Map.