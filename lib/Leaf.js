const { mkdir, readdir, readFile } = require("fs");
const { join } = require("path");

const FILE_EXTENSION = ".leaf"
const DEFAULT_TEMPLATE_DIR = "templates";
const ROOT = "::root"
const BULLETINS = ["App","component","children","use"]

class Leaf {

    templateDir = DEFAULT_TEMPLATE_DIR;
    root = ROOT;
    rootFileName = null;

    build({
        buildDir = "public",
        name
    }) {
        console.log(`Building ${name} \n`);

        mkdir(join(__dirname, `../${buildDir}`), () => {
            console.log("Created public directory ✨ \n");
        });

        console.log(`Compiling ${FILE_EXTENSION} files present in ${this.templateDir} folder `);

        readdir(join(__dirname, `../src/${this.templateDir}`), (err, files) => {
            if (err) throw err;

            console.log(files);

            const templateFiles = files.filter(file => file.endsWith(FILE_EXTENSION));

            console.log(templateFiles);

            templateFiles.forEach((leaf) => {
                readFile(join(__dirname, `../src/${this.templateDir}/`, leaf), (err, data) => {
                    if (err) throw err;
                    
                    const bufferString = data.toString();

                    if (bufferString.indexOf(`<App ${this.root}>`) !== -1) {

                        if (this.rootFileName != null) {
                            throw new Error("Can't have two roots " + this.rootFileName + " and " + leaf + ". Please remove one")
                        }

                        this.rootFileName = leaf;
                    }
                    leafCompiler(data.toString())
                })
            })
        })
    }
}

/***
 * 
 * for example
 * 
 * <App ::root>
 *      <use ::container/>
 * </App>
 * 
 * 
 * 
 * 
 */

const leafCompiler = (leaf) => {
    
}

const useComponent = () => {

}

const useComponentWithChildren = () => {

}

module.exports = Leaf;