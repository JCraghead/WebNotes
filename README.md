
# WebNotes Version 1.4.0

WebNotes is a group project that has been started for our CS 386 class and will continue development till the end of Fall 2024. The existing codebase, with limited functionality, remains available under an MIT license. Please proceed at your own risk. 

Web Notes is a simple Chrome extension note-taking software that will allow users to take notes, share them with students, and save them efficiently.

## Status

Web Notes is currently available on the Chrome Web store and can be found at our website [WebNotes.space](https://webnotes.space/). Please contact the developers for any information.

## Development setup

WebNotes uses a Chrome extension for client-side operations. As of now this is an unpacked extension and must be loaded in developer mode on Google Chrome. Future releases will provide the packed version available on the Chrome Store.
Our local development server runs on Python using Flask and Flask-Cors, both of which are required to be installed in order for the server to function.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Git\
Flask\
Flask-Cors\
MySql-Connector\
Credentials

### Installing

1. Fork the [repository](https://chromewebstore.google.com/detail/webnotes/dbeikfpfmondbdicbmmfcnmbidhphboo?hl=en-US&utm_source=ext_sidebar), then clone to your local machine.
2. Make sure you have the developer mode turned on in Google extensions.
3. Choose the "Load Unpacked" option.
4. Select the "ClientSide" Folder from our downloaded repository. 
5. (Optional) Start the local Flask server and set "remoteServer" variable in content.js to its corresponding address.
6. Refresh Google Chrome and WebNotes should be ready to use on the extension shortcut on the Google Chrome homepage.



## Deployment

For WebNotes, the deployment utilizes a Flask server hosted on an AWS EC2 instance, where Nginx and Gunicorn establish a reverse proxy to direct requests to the internal Flask application. This setup enhances scalability and performance, ensuring seamless access. The WebNotes Chrome extension is available at [webnotes.space](https://webnotes.space/) and on the Google Chrome Store, providing users with an easy and accessible note-taking tool.


# Developers

* **Landon** - *Initial work* - [PequenoCoder](https://github.com/PequenoCoder)
* **Lucas** - *Initial work* - [lucaslarson25](https://github.com/lucaslarson25)
* **Avnish** - *Initial work* - [avnishsinha](https://github.com/avnishsinha)
* **Jarom** - *Initial work* - [JCraghead](https://github.com/JCraghead)
* **Ronan** - *Initial work* - [uploading3211](https://github.com/uploading3211)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2024 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

