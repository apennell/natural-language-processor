# Natural Language Processor

This is a Node-Express app that uses [MeaningCloud Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1) to provide basic sentiment analysis of the content at a user-submitted URL.

## Technologies

- JavaScript, HTML, and Sass to make it show up and look good
- Node and Express for the server and routing
- Webpack and Babel to bundle and transpile for the browser
- Jest for JavaScript testing
- [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) to enable service workers for minimal offline capabilities
- [MeaningCloud Sentiment Analysis API](https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1)

## Getting Started

1. Clone repo
2. `cd natural-language-processor`
3. Run `npm install` to install the node modules

### To run in development mode

1. Run `npm start` to start the server
2. Run `npm run build:dev` to build and run the webpack dev server with hot reloading
3. This should automatically open http://localhost:8080/ in your browser to view the app, updating when code changes are made.

### To run in production mode

1. Run `npm run build:prod` to build the app in production mode
2. Run `npm start` to start the server
3. Open http://localhost:3000/ in your browser to view the app

### Testing

`npm test` will run through all test suites once; `npm run test:watch` will run the tests once the remain in watch mode for updates.
