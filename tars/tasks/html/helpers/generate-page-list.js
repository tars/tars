'use strict';

const through2 = tars.packages.through2;
const fs = require('fs');

/**
 * Generate a list of all pages in project
 */
module.exports = function generatePageStructure() {
    var htmlForNewPage =
`<!doctype html>
<html>
    <body>
        <h1>List of pages</h1>
        <ul class="pl-listOfPages">`;

    return through2.obj((file, enc, callback) => {
        const pageName = file.path.match(/\/dev\/([\/\w\d_]+\.html)/i)[1];

        htmlForNewPage += `
            <li>
                <a href="./${pageName}" target="_blank">${pageName}</a>
            </li>
        `;

        return callback();
    }, callback =>  {
        htmlForNewPage +=
        `</ul>
    </body>
</html>`;

        fs.writeFileSync(process.cwd() + '/dev/__index.html', htmlForNewPage);
        return callback();
    });
}
