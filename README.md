![image](https://user-images.githubusercontent.com/5794831/144872869-dc86580b-1c68-4635-bd13-3b7af04c0ca8.png)

# Todo Frontend Implementation
Code test for a job interview and was done in a couple of hours

This is the frontend implementation of the TodoAPI https://github.com/NoPainNullGain/TodoApi

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You need a recent installation of Node on your computer... and git if you want to clone the project

### Installing
You can either download this project or clone it from github: yo ucan use this command to clone it and give it a new name
(replace "fancy project" with your own name...)
```console
git clone https://github.com/NoPainNullGain/TodoFrontend
```

move into your newly created folder and install all dependencies (node modules)
```console
npm install
```

### Start Developing
You run the project example in the src folder
```console
npm run watch
```
Your browser should no show the index.htm and automatically refresh when you do changes in the src folder.
Remember that your src files are automatically transpiles and or copied to the dist folder and then showed from there

### Deployment
When your project is ready for deployment you should use webpack in production mode by writing this in the console
```console
npm run webpack:prod
```
That will minify your code and make is production ready
