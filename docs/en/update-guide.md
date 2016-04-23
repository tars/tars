<p align="right">
English description | <a href="../ru/update-guide.md">Описание на русском</a>
</p>

# TARS update guide 

**Automatic project-update is available via TARS-CLI and TARS from version 1.5.0. You can get more info from [documentation of TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/update-actions.md). It is not necessary to do anything from this artcile in case of using TARS-CLI!**

In one major version (for example, 1.\*.\*  ), you can use a markup folder (this is the folder in which should be the sources of your project) in any version. In any version within one major version building will be successful. This is true for TARS above (and including) version 1.2.0. Prior to 1.2.0 there were small changes in the file structure and method of including components in the Handlebars. All changes are available in the [changelog](changelog.md).

To get the new functionality, which was released in a new minor version (for example *.4.* ) is enough:

* [download new TARS](https://github.com/tars/tars/archive/master.zip);
* initialize it with the settings that are in your current project;
* transfer the folder markup from the current project to a new TARS;
* udpate tars-config, if it is necessary.

After that, you can use the new features. Learn more about versioning system [here](http://semver.org/).

**Automatic project-update is available via TARS-CLI and TARS from version 1.5.0. You can get more info from [documentation of TARS-CLI](https://github.com/tars/tars-cli/blob/master/docs/en/update-actions.md)!**

There are some important moments. For example, work with coffee-files has been added in one of the minor versions. If your project uses only JavaScript, you can also use any minor version within the major. If you want to use the coffee-files, you need to select only the version in which tasks for working with them were added or higher version.

In the [readme](../README.md) is described in which version you have access to the different functionality.

Also, if you have changed builder files (anything else, except markup folder), it is necessary to apply these changes manually. All recent changes available in [changelog](changelog.md).
