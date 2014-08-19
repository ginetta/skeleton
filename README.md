<img id="logo" align="right" height="90" style="margin: 0 0 20px 20px" src="http://imgh.us/skeleton.svg">

# Skeleton

## What is skeleton
Skeleton is a static site generator that can serve as a boilerplate for different frontend projects. It includes:
- defines a folder structure to develop a web app
- defines a way to write reusable web components (HTML / CSS / JS)
- includes a grunt task to compile jade and translated data files
- makes use of some custom CSS & JS we often reuse on projects
- generates a styleguide for the defaults styles and documenting the components

## Guides

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Reusable Components](#reusable-components)
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
  - [Ruby](https://www.ruby-lang.org/en/) to compile the css and [bundler](http://bundler.io/) to install GEM dependencies
  - [grunt-cli](https://github.com/gruntjs/grunt-cli) to run the grunt commands

#### Installation

Make sure you use the lastest gems and compass:

    (sudo) gem update --system && gem install compass

Install all the project dependencies:
    
    npm install


### Generate the app

To build the project, just run

    grunt

It will generate all the files, start a server and open your browser with the project index


## <a id="folder-structure">Structure</a>

    .
    ├── Gemfile 						List of used rubygames (used for bundle)
    ├── Gruntfile.js 					Grunt base file
    ├── app							App specific files
    │   ├── assets					Images, video
    │   ├── components		
    │   │   ├── components.jade		Includes all the components jade mixins check "Reusable Components" for more information
    │   │   ├── components.scss		Includes all the components SCSS/SASS files
    │   │   ├── docs-skeleton			Documentation also used as example
    │   │   └── mycomponent			Example compontent
    │   │       ├── ...				Component files
    │   │       └── package.json		compontent meta information
    │   ├── css						App specific CSS
    │   ├── data						Data that will be avalibe in JADE
    │   │   ├── en.json				Data can be language specific
    │   │   └── ...
    │   ├── js						
    │   │   ├── globals.js			Used to store globals if needed
    │   │   └── main.js				JS gets initialized here
    │   ├── layout					Layouts that can be extended in JADE pages
    │   ├── meta						Favicons, humans.txt etc..
    │   └── pages						Contains Pages/View of your app
    │       ├── docs					Documentation, can be removed
    │       └── index.jade			Used as a starting poit
    │
    ├── bower.json					Bower packages are registered here
    │
    ├── lib							Library used for the build
    │   ├── grunt-tasks				Grunt tasks add your here
    │   │   ├── aliases.yaml			Named tasks
    │   │   └── ...
    │   └── toolset					Skeleton specific tasks
    │
    ├── dist							Builded app (HTML,CSS,JS etc..) 
    


## <a id="reusable-components">Reusable Components</a>


## <a id="templates">Jade templates, Data and translation</a>


## <a id="reusable-components">Reusable Components</a>
### Concept
### How to create a new component
  
    grunt addComponent --name=foo
creates a new component called foo

    grunt addComponent --name=bar --parent=foo
creates a new component named bar that is a sub component of foo


## <a id="toolset">JS / CSS Toolset</a>


## <a id="styleguide">Styleguide</a>
