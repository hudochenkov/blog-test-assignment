# Blog Test Assignment

See how it works: https://blog-test-assignment-3f3278.netlify.com/

## Requirements

Use the https://jsonplaceholder.typicode.com/ API to create a blogging application.

- Display the posts that load the posts at 10 at a time with infinite scrolling.
- Add a form that allows you to create a post.
- Add button and form that allows to edit a post.
- Delete a post.

The app has to be a React app that uses Redux to store the state.

## Implementations notes

It's an MVP (minimal valuable product), so many things were omitted to finish assignment in less time:

* No routing.
* No form sanitizing.
* No loading/in progress states.
* No error handling.
* No visual design.
* Doesn't handle edge cases, where title or body of a post is empty.
* Only few tests.

Due fake API limitation, it's not possible to create more than one post without messing with data.

## Docs

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/next/packages/react-scripts/template/README.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
