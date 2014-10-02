<img id="logo" align="right" height="90" style="margin: 0 0 20px 20px" src="http://imgh.us/skeleton.svg">

# Skeleton

## What is skeleton

Skeleton is a frontend project boilerplate.  
It **embraces modularity** and generates a living styleguide that facilitates the communication between the parties involved in the development process.


### Skeleton features:
#### [A JS / SCSS / CSS / Grunt toolset](#toolset)
The skeleton includes some CSS and JS helpers/libraries to help you.  
It also includes a set of grunt tasks that are pre-configured to get you going.  

#### [A defined files/folders structure](#structure)
To unify all the projects you work on, skeleton defines a folder structure to put your files in.  

#### [A reusable components convention](#reusable-components)
Skeleton also defines a way to write components that you can re-use in your project.  

#### [A styleguide generator](#styleguide)
A style-guide containing all components and theme styles will be generated automatically while you develop and design.  
It creates a *common language* for all project members and a quick overview over your projects components and explains their usage.  

#### [A static site generator](#site-generator)
The skeleton includes grunt tasks to compile jade templates with data files.



### Design principles:
- We value convention over configuration
- We try to abstract convention when possible
- We strive to impose as tools as possible to make it easy to swap tools to your liking


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

Make sure you use the latest gems:

    (sudo) gem update --system

Install and run bundler:
    
    gem install bundler && bundle install

Install all the project dependencies:
    
    npm install


### Generate the app

To build the project, just run

    grunt

It will generate all the files, start a server and open your browser with the project index

## <a id="toolset">JS / SCSS / CSS / Grunt toolset</a>

All frontend dependancys are managed truth bower and are optional. We have decided to include a few by default, because we use them all the time. Feel free to remove them for your own app

- [H5BP](http://html5boilerplate.com/) layout.jade and the CSS base structure is from HTML5 Boilerplate
- [compass](http://compass-style.org/) We use compass with all its nice little helpers
- [bonescss](https://github.com/meodai/bonescss) Includes lots of helpers classes from H5BP and useful mixins
- [sensible](https://github.com/meodai/sensible) Handles responsiveness and provides a very simple grid
- [require.js](http://requirejs.org/) Is used to require the JS components, also encourages a modular way of writing your code
- [jquery](http://jquery.org/) jQuery, you know

<!-- TODO: Describe our grunt setup -->

## <a id="structure">Files / Folders structure</a>

    .
    ├── Gemfile                 List of used ruby gems (used for bundle)
    ├── Gruntfile.js            Grunt base file
    ├── app                   App specific files
    │   ├── assets              Images, video
    │   ├── components    
    │   │   ├── components.jade   Includes all the components jade mixins check "Reusable Components" for more information
    │   │   ├── components.scss   Includes all the components SCSS/SASS files
    │   │   ├── docs-skeleton     Documentation also used as example
    │   │   └── mycomponent       Example component
    │   │       ├── ...         Component files
    │   │       └── package.json  component meta information
    │   ├── css               App specific CSS
    │   ├── data                Data that will be available in JADE
    │   │   ├── en.json         Data can be language specific
    │   │   └── ...
    │   ├── js            
    │   │   ├── globals.js      Used to store globals if needed
    │   │   └── main.js     JS gets initialized here
    │   ├── layout        Layouts that can be extended in JADE pages
    │   ├── meta          Favicons, humans.txt etc..
    │   └── pages         Contains Pages/View of your app
    │       ├── docs        Documentation, can be removed
    │       └── index.jade        Used as a starting point
    │
    ├── bower.json              Bower packages are registered here
    │
    ├── lib                   Library used for the build
    │   ├── grunt-tasks         Grunt tasks add your here
    │   │   ├── aliases.yaml      Named tasks
    │   │   └── ...
    │   └── toolset             Skeleton specific tasks
    │
    ├── dist                  Builded app (HTML,CSS,JS etc..) 


## <a id="reusable-components">Reusable Components</a>
### Concept
In order to write maintainable, generic and reusable code we like to write our code in components. Where a component consits of one of each: 

- jade file that contains the markup
- SCSS containes the specifc styles
- JS file as requirejs module
- JSON file to store metadata 

Every component can have sub-components. We recommend to limit the encapsulation to reduce the complexity (dependencies).

### How to create a new component
  
    grunt addComponent --name=foo
creates a new component called foo

    grunt addComponent --name=bar --parent=foo
creates a new component named bar that is a sub component of foo


## <a id="styleguide-generator">Styleguide generator</a>
** *This is in development in the styleguide branch* **

<!-- TODO: Document the styleguide generator -->


## <a id="site-generator">Static site generator</a>
### Jade
We choose jade because it always renders valid HTML and it makes it easy to work in a modular way. 
It brings some key features (e.g. mixins and blocks) that promotes code reuse and maintainability.

### Data & Translations
Optionally you can store data (even languages specific data) in a JSON file. This file is located under app/data/<language>.js. The data stored in this file will be available in all jade files under the data variable. If you have more that one language file, it will generate each page per data file.
For instance, if you have a en.json and de.json container the language specific data for both english and german, skeleton will generate two html files for each page, each with their own specific language data.
