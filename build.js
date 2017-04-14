var fs = require("fs");
var path = require("path");

function resolveImports(file) {
    var contents = fs.readFileSync(file, "utf-8");
    var root = path.dirname(file);

    return contents.replace(/^[ \t]*import[ \t]+\"(.*?)\"[; \t]*$/img, function(m, file) {
        file = path.join(root, file);
        return resolveImports(file);
    });
}

fs.writeFileSync("./dist/index.js", resolveImports("src/index.js"), "utf-8");
