/**
 * #k_infinityIII@Echwood
 *
 */

//
import fileSystem from 'fs';


// Proto file properties holder(package,service,function names)
const serviceFacade = [{
    name: '',
    fileService: null,
    serviceImplementation: null,
}, ];

// Clean it up after giveing it structure
serviceFacade.pop(0);

// On conditional require for {service}.js files Implementaion of .proto service functions
const wrapper = {

    requireF: (modulePath) => {

        try {

            return require (modulePath);

        } catch (err) {

            console
                .log(`requireF(): The file ${modulePath} could not be loaded :: ${err}`);

            return false;

        }

    }

};


// Path containing services implementations
const path1 = '/../services/';
// Get list of all files in path directory
const protoFileList = fileSystem
    .readdirSync(`${__dirname}\\${path}`)
    .filter((filename) => filename.match(/\.proto$/));

protoFileList.forEach((protoF) => console.log(protoF));

// Iterate through the files and get the packages and services and functions
protoFileList.forEach((protoFile) => {

    let xpackage = '';
    // Get file properties as an array
    const properties = parse(fileSystem.readFileSync(`${__dirname}\\..\\proto\\${protoFile}`).toString());

    // Get names from array
    properties.content.forEach((entity) => {

        // Get package name
        if (entity.type === 'package') {

            xpackage = entity.package;

        }
        // Get services
        if (entity.type === 'service') {

            const name = entity.name;

            // Handle service implementation
            const ps_ = `${__dirname}${path1}${entity.name}`;

            const serviceImplementation = wrapper.requireF(ps_);

            // Handle service
            const pf_ = `${__dirname}${path}\\${protoFile}`;
            const PFS = grpcLibrary
                .loadPackageDefinition(protoLoader
                    .loadSync(pf_, options));

            const protoFileService = PFS[xpackage][name].service;

            // Push to datastructure
            protoServiceFacade.push({
                name,
                protoFileService,
                serviceImplementation: serviceImplementation.default,
            });


        }

    });


});

export default protoServiceFacade;
