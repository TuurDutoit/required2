renderer = require("../rederer")
var saveFile = {
    originalLocation: "",
    file: {},
    load: function(location){
        saveFile.originalLocation = location;    
    },
    save: function(location){}
}
module.exports = saveFile;