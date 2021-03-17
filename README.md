# Install & run the web-app
1. Fetch the project on your local machine
> $ git clone https://gitlab.com/askalia/sequence-app.git
> $ cd /path/to/sequence-app

 2. copy env file I gave you into project folder

> $ cp /path/to/download-folder/env-file-downloaded ./
> make sure env file is named ".env.dev"

3. make sure node v10 or above is installed
> $ node -v
> otherwise [install nvm](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/)
> $ nvm install 10
> $ nvm use 10

4. install yarn which is faster thant npm to fetch dependencies
> $ npm i -g yarn

5. install NPM dependances for node.js
> $ yarn install

6. run the web-app
> $ yarn start

7. run the web-app with debug mode
> $ yarn run start:dev

8. Enjoy :)
