const fs = require('fs');
var drafter = require('drafter');
var mustache = require('mustache');
function apib_to_html(templateHtml,apibFile,fileName) {

    var drafteroptions = {
        generateSourceMap: false,
    };
    let apibInput = apibFile.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');

    const folderName = '../parsedApib';
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    let extensionFileName = fileName.split(".").pop();
    fileName = fileName.substring(0,fileName.indexOf("." + extensionFileName));



    drafter.parse(apibInput, drafteroptions, function(err, result) {
        if (err) {
            console.log(err);
        }
        // fs.writeFile("./drafterResult.json", JSON.stringify(result,null,4), 'utf8', function (err) {
        //     if (err) return console.log(err);
        // });
        let newParsed = CreateNewParsedApibFromDrafterParser(result);
        fs.writeFile("../parsedApib/" + fileName + ".json" , JSON.stringify(newParsed,null,4), 'utf8', function (err) {
            if (err) return console.log(err);
        });

        // turnNewParsedApibToMustacheView is not complete
        let view = turnNewParsedApibToMustacheView(newParsed);

        var output = mustache.render(templateHtml, view);

        fs.writeFile("./output.html", output, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });


}
function turnNewParsedApibToMustacheView(newParsedApib){
    var view = {};
    view[".Title"] = newParsedApib.title;
    view['template \\"Introduction\\" .'] = "something";
    view['template \\"ResourceGroups\\" .'] = "something";
    view['template \\"Navigation\\" .'] = "something";
    view['define \\"Navigation\\"'] = "something";
    view['define \\"Navigation\\"'] = "something";
    //...

    // view["$group"] = {
    //     Title:"salam2"
    // };
    // view["$transition"] = {Title:"salam3"};
    return view;
};
function CreateNewParsedApibFromDrafterParser(apiElement){
    let newParsedApib = {};
    newParsedApib["title"] = "";
    newParsedApib["attributes"] = [];
    newParsedApib["copies"] = [];
    newParsedApib["resources"] = [];

    let ref = apiElement.content;
    for (let i = 0, len = ref.length; i < len; i++) {
        let category = ref[i];
        if (category.element !== "category"){
            continue;
        }
        newParsedApib["title"] = category.meta.title.content;//**********
        //title = category.meta.title.content;
        let ref1 = category.attributes.metadata.content;
        for (let j = 0; j < ref1.length; j++) {
            let element = ref1[j];
            //element.content.key.content + ":" + element.content.value.content
            newParsedApib["attributes"].push({key:element.content.key.content,value:element.content.value.content});
        }
        let ref2 = category.content || [];
        for (let j = 0; j < ref2.length; j++) {
            let element = ref2[j];
            if (element.element === "copy"){
                newParsedApib["copies"].push(element.content)
            }
            else if (element.element === "resource"){
                var resourceInfo = getResourceInfo(element);
                newParsedApib["resources"].push(resourceInfo);
            }
        }
    }
    return newParsedApib;
};
function getResourceInfo(resourceJson){
    var resourceInfo={};
    resourceInfo["title"] = resourceJson.meta.title.content;
    resourceInfo["href"] = resourceJson.attributes.href.content;
    resourceInfo["hrefVariables"] = [];
    if (resourceJson.attributes.hrefVariables !== undefined){
        let ref = resourceJson.attributes.hrefVariables.content;
        for(let i = 0;i<ref.length;i++){
            let oneHrefVariables = ref[i];
            let typeAttributes = [];
            let ref2 = oneHrefVariables.attributes.typeAttributes.content;
            for (let j = 0;j<ref2.length;j++){
                typeAttributes.push(ref2[j].content);
            }
            resourceInfo["hrefVariables"].push(
                {
                    title:oneHrefVariables.meta.title.content,
                    description:oneHrefVariables.meta.description.content,
                    key:oneHrefVariables.content.key.content,
                    value:oneHrefVariables.content.value.content,
                    typeAttributes:typeAttributes
                }
            );
        }
    }
    let ref2 = resourceJson.content;
    resourceInfo["copies"] = [];
    resourceInfo["transitions"] = [];
    for(let i = 0;i<ref2.length;i++){
        let element = ref2[i];
        if (element.element === "copy"){
            resourceInfo["copies"].push(element.content);
        }
        else{
            let transitionInfo = getTransitionInfo(element);
            resourceInfo["transitions"].push(transitionInfo);
        }
    }
    return resourceInfo;
};
function getTransitionInfo(transitionJson) {
    var transitionInfo = {};
    transitionInfo["title"] = transitionJson.meta.title.content;
    transitionInfo["copies"] = [];
    transitionInfo["httpRequest"] = {};
    transitionInfo["httpResponse"] = {};
    let ref = transitionJson.content;
    for (let i = 0;i<ref.length;i++){
        let element = ref[i];
        if (element.element === "copy"){
            transitionInfo["copies"].push(element.content);
        }
        else{
            let ref2 = element.content;
            for (let j = 0;j<ref2.length;j++){
                let element2 = ref2[j]
                if (element2.element === "httpRequest"){
                    transitionInfo["httpRequest"]["method"] = element2.attributes.method.content;
                    transitionInfo["httpRequest"]["headerAttributes"] = [];
                    if (element2.attributes.headers !== undefined){
                        let ref3 = element2.attributes.headers.content;
                        for (let k = 0;k<ref3.length;k++){
                            let element3 = ref3[k];
                            transitionInfo["httpRequest"]["headerAttributes"].push(
                                {
                                    key:element3.content.key.content,
                                    value:element3.content.value.content,
                                }
                            )
                        }
                    }
                    let ref4 = element2.content;
                    transitionInfo["httpRequest"]["sections"] = [];
                    for (let k = 0;k<ref4.length;k++){
                        let element3 = ref4[k];
                        if (element3.element === "dataStructure"){
                            var dataStructure = {};
                            dataStructure["type"] = "dataStructure";
                            dataStructure["members"] = [];
                            let ref5 = element3.content.content;
                            for (let s = 0;s<ref5.length;s++){
                                let element4 = ref5[s];
                                let typeAttributes = [];
                                if (element4.attributes !== undefined){
                                    let ref6 = element4.attributes.typeAttributes.content;
                                    for(let z = 0;z<ref6.length;z++){
                                        typeAttributes.push(ref6[z].content);
                                    }
                                }
                                dataStructure["members"].push(
                                    {
                                        description:element4.meta.description.content,
                                        typeAttributes:typeAttributes,
                                        key:element4.content.key.content,
                                        value:element4.content.value.content
                                    }
                                )
                            }
                            transitionInfo["httpRequest"]["sections"].push(dataStructure);
                        }
                        else if (element3.element === "asset"){
                            let asset = {};
                            asset["type"] = element3.meta.classes.content[0].content;
                            asset["contentType"] = element3.attributes.contentType.content;
                            asset["content"] = element3.content;
                            transitionInfo["httpRequest"]["sections"].push(asset);
                        }
                    }

                }
                else if (element2.element === "httpResponse"){
                    transitionInfo["httpResponse"]["statusCode"] = element2.attributes.statusCode.content;
                    transitionInfo["httpResponse"]["headerAttributes"] = [];
                    transitionInfo["httpResponse"]["sections"] = [];
                    let ref3 = element2.attributes.headers.content;
                    for (let k = 0;k<ref3.length;k++){
                        let element3 = ref3[k];
                        transitionInfo["httpResponse"]["headerAttributes"].push(
                            {
                                key:element3.content.key.content,
                                value:element3.content.value.content,
                            }
                        )
                    }
                    let ref4 = element2.content;
                    for (let k = 0;k<ref4.length;k++){
                        let element3 = ref4[k];
                        let asset = {};
                        asset["type"] = element3.meta.classes.content[0].content;
                        asset["contentType"] = element3.attributes.contentType.content;
                        asset["content"] = element3.content;
                        transitionInfo["httpResponse"]["sections"].push(asset);
                    }
                }
            }
        }
    }
    return transitionInfo;
}
module.exports = apib_to_html;