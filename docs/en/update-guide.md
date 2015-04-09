# TARS update guide 

As I mentioned in the [readme](../README.md), TARS is not a npm-module, you can't upgrade it with single command in the console.

There are several types of updates TARS:

* update dependencies to the latest stable versions;
* TARS full update.

You can run the first type of upgrade by command `gulp update-deps` (more details in the [readme](../README.md#basic-commands)). The second requires several steps. 

Generally, in the major version (for example, 1.\*.\*  ), you can use a markup folder (this is the folder in which should be the sources of your project) in any version. In any version within one major version building will be successful. This is true for TARS above (and including) version 1.2.0. Prior to 1.2.0 there were small changes in the file structure and method of including modules in the handlebars. All changes are available in the [changelog](changelog.md).

To get the new functionality, which was released in a new minor version (for example *.4.* ) is enough:

* [Download new TARS](https://github.com/2gis/tars/archive/master.zip).
* Initialize it with the settings that are in your current project.
* Transfer the folder markup from the current project to a new TARS.

After that, you can use the new features. Learn more about versioning system [here](http://semver.org/).

There is an exception to this rule. For example, work with coffee-files has been added in one of the minor versions. If your project uses only js, you can also use any minor version within the major. If you want to use the coffee-files, you need to select only the version in which were added tasks for working with them or higher version.

In the [readme](../README.md) will be necessarily described in which version you have access to the different functionality.

Also, if you change builder files (anything else, except markup folders), it is necessary to transfer these changes manually. All recent changes in builder files will be available for link: [changelog](changelog.md).

To move from one major version to another will be written in appropriate guide.