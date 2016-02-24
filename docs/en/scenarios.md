<p align="right">
English description | <a href="../ru/scenarios.md">Описание на русском</a>
</p>

# Usage scenarios

There are 3 scenarios of using TARS. In fact, you can up with another scenarios. The main scenarios will be listed here:

* development with a transfer to the back-end for implementing;
* development of a static site locally.
* development of a static site that is ready to deploy.

You can get more info from [FAQ](faq.md).

In all scenarios, it is mean that the development mode (dev-task) will be available with any keys.

## Development with a transfer to the back-end developer

In this case, in the tars-config is important to set the minifyHtml option to false. You can also disable removeConsoleLog (false), to retain all console.log unchanged.

So, for the convenience of builds versioning you can include the useBuildVersioning and useArchiver options, to have the archive ready for sending in each folder with built project.

During assembly (build-task) is desirable not to use the `-–release` key.

To verify efficiency of minified files can be used the `-–min` key.

## Development of a static site locally

In this case, the minifyHtml option can be any way you want. All other options you can set as comfortable except useArchiver. This option should be turned off because we don't need useless files.

During assembly (build-task) is desirable to use the `--release` key.

## Development of a static site that is immediately ready for deploy

All the same, as for the "Development of a static site locally."

During assembly (build-task) you have to use the `--release` key.
