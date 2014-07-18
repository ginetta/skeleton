<img align="right" height="60" style="margin: 0 0 20px 20px" src="http://imgh.us/skeleton.svg">

# Skeleton

## What is skeleton
Skeleton is a static site generator that can serve as a boilerplate for different frontend projects. It includes:
- defines a folder structure to develop a web app
- defines a way to write reusable web modules (HTML / CSS / JS)
- includes a grunt task to compile jade and translated data files
- makes use of some custom CSS & JS we often reuse on projects
- generates a styleguide for the defaults styles and documenting the modules

## Guides

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Reusable Modules](#reusable-modules)
- [Jade templates, Data and translation](#templates)
- [JS / CSS Toolset](#toolset)
- [Styleguide](#styleguide)


## <a id="getting-started">Getting started</a>

### Setting up a new project
To start a new project, create a new repository on git and add the skeleton repository as remote:

    git remote add skeleton https://github.com/ginetta/skeleton.git 

Fetch the data from skeleton:

    git pull skeleton/master

That's it, you should have the boilerplate in your project.
Find and replace "skeleton-project" by your "project-name" in the whole project (CMD + SHIFT + F on Sublime Text). You can now check in all those files in your repo and push them to your git:

    git commit -a
    git push origin/master

### Using the skeleton

#### Prerequisites
You will need 
  - [node.js](http://nodejs.org/) to run the skeleton.
  - [Ruby](https://www.ruby-lang.org/en/) to compile the css
  - [grunt-cli](https://github.com/gruntjs/grunt-cli) to run the grunt commands

#### Installation

Make sure you use the lastest gems and compass:

    (sudo) gem update --system && gem install compass

Install all the project dependencies:
    
    npm install

Install bower dependencies by using the

    bower install

Install ruby dependencies by using

    bundle install

### Generate the app

To build the project, just run

    grunt

It will generate all the files, start a server and open your browser with the project index


## <a id="folder-structure">Folder Structure</a>

## <a id="reusable-modules">Reusable Modules</a>
### Concept
### How to create a new module

## <a id="templates">Jade templates, Data and translation</a>

## <a id="toolset">JS / CSS Toolset</a>


## <a id="styleguide">Styleguide</a>

## Bonus

- Under OSX it will be helpfull if you install brew: http://brew.sh/
- Install the `Jade` and `SCSS` Sublime Text packages to get syntax highlighting
- Quick Jade syntax tour: http://www.learnjade.com/
