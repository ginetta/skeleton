<img align="right" height="60" style="margin: 0 0 20px 20px" src="http://imgh.us/skeleton.svg">

# Project Setup skeleton-project


## Intro

The project is composed of independent JADE / JS & SCSS modules which make it easy to track the modules separately in Jira. That way we also have as modular a frontend. Folder hierarchy and a mode.json or page.json file is used to declare the modules. These JSON files contain meta information for each module which are available in the frontend prototype.

As an example take a look as (`frontend/modules/contents/calendar`) you will find a SCSS, JADE file and a JSON file. Open the JSON. Once you have build  the project (See chapters Install & Build) check the file under `/web/html/components.html` (look for CN-3 Event Calendar).

The demo pages a build using frontend/components/mod.jade the module it self will be rendered in mod-isolated.jade in order to show it in the iframe that simulates the responsiveness.


## Install & Build

We use Grunt to build and bower to manage frontend dependencies. The following steps will explain how to install the build tools:

- Install node.js (coming with NPM in order to run this setup, it runs under windows, osx and linux)
- Make sure you use the lastest gems and compass:
   - (sudo) gem update --system && gem install compass
- Install grunt-cli: `npm install -g grunt-cli`
- Set up this project with: `npm install`
- Download bower dependencies by using the `bower install` command
- Run `grunt build` to build all frontend files
- Run only `grunt` to build an watch the folder for changes
- Find and replace "skeleton-project" by "project-name" in the whole project (CMD + SHIFT + F on Sublime Text)


## Require JS

Require JS is used for JS Dependency management. The basic idea of require.js is that every single js CLASS is in a separate file, that will return the CLASS. Should you not know Require.js check official documentation: http://requirejs.org/


## Bonus

- Under OSX it will be helpfull if you install brew: http://brew.sh/
- Install the `Jade` and `SCSS` Sublime Text packages to get syntax highlighting
- Quick Jade syntax tour: http://www.learnjade.com/
