# Weswit JavaScript Utilities Toolkit

This project contains an utility toolkit that is part of the Lightstreamer JavaScript client library.
The various classes are written as AMD modules.

See http://blog.lightstreamer.com/2013/11/visual-layer-of-javascript-client.html to learn more.
     
## Project Structure

*    sources: Here you can find the source files
*    build: This folder simply contains the app.build.js configuration to be used to build the library using the [r.js optimizer](https://github.com/jrburke/r.j) and a README.md with some instructions.
*    tests: There are two ways to run the tests, running index.js on Node.js or launching index.html on a browser. Some modules will not be tested when running in Node.js while other modules may need to be tested on different browsers to ensure compatibility. Tests are based on the [Weswit JavaScript test toolkit](https://github.com/weswit/utility-test-javascript), logging is provided by the [Weswit JavaScript log toolkit](https://github.com/weswit/utility-logging-javascript).




