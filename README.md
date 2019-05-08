## App Notes

You can try app [Pokedex App](https://dstuff.github.io/poke-dex-app)

### General description
Pokedex app was built using standard `create-react-app` and some improvements for using **MobX** decorators.
This goal has been achieved using `react-app-rewired` and `customize-cra` packages with `@babel/plugin-proposal-decorators` as well.

Project linted using `standard` ESLint configuration.

### Project structure

All app's components placed into `components` directory into separate sub-directories, 
for example `components/list-item`. Which contains `list-item.js`, `list-item.css` and `index.js`.

### State management

**MobX** was defined as a state management by task's conditions, and isolated into separate
directory `state`.<br>
It could be separated by logic, for example **Pokemon** and **Pagination** stores.
But for that small application it's not necessary.

Also, in the future development, in case some additional API requests will be added, we can isolate `api` 
as a separate service (file) and import into stores that need it.

### Utils directory

Contains some helper function and services, such as making the first letter in the word/phrase/sentence capital.
Or debounce function to prevent loading to the API server and so on.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


