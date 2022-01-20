const fs = require('fs');
function turnParsedApibToSlateMarkdown(jsonText,fileName){
    let parsedApibJson = JSON.parse(jsonText);
    let apiTitle = parsedApibJson.title;
    let markDownText = "---\n" +
        "title: API Reference\n" +
        "\n" +
        "language_tabs: # must be one of https://git.io/vQNgJ\n" +
        "  - shell: CURL\n" +
        "  - java: JAVA\n" +
        "  - plaintext: RAW\n" +
        "  - python: PYTHON\n" +
        "  - php: PHP\n" +
        "  - csharp: C#\n" +
        "\n" +
        "includes:\n" +
        "  - errors\n" +
        "\n" +
        "search: true\n" +
        "\n" +
        "code_clipboard: true\n" +
        "\n" +
        "meta:\n" +
        "  - name: description\n" +
        "    content: Documentation for the " + apiTitle + " API\n" +
        "---\n\n";
    markDownText += writeApiTitleSection(parsedApibJson);

    let hostValue = "";
    parsedApibJson.attributes.forEach((value) => {
        if (value.key === "HOST"){
            hostValue = value.value;
        }
    })
    //console.log(markDownText);
    parsedApibJson.resources.forEach((oneResource) => {
        markDownText += writeResourceSection(oneResource,hostValue);
    })
    fs.writeFile("../parsedApib/" + fileName + ".md" , markDownText, 'utf8', function (err) {
        if (err) return console.log(err);
    });
}
function writeApiTitleSection(parsedApibJson){
    let apiTitle = parsedApibJson.title;
    let keepMarkDownText = "# " + apiTitle + "\n\n";
    let hostValue = "";
    parsedApibJson.attributes.forEach((value) => {
        if (value.key === "HOST"){
            hostValue = value.value;
        }
    })

   // let titleSectionText = [];
    parsedApibJson.copies.forEach((value) => {
        // let eachLineText = value.split(/\n+/);
        // eachLineText.forEach((value2) => {
        //     titleSectionText.push(value2);
        // })
        keepMarkDownText += value + "\n\n";
    })
    // let titleSectionTextWithoutToken = [];
    // titleSectionText.forEach((value) => {
    //     if (value[0] === ">"){
    //         titleSectionTextWithoutToken.push(value.substring(2,value.length));
    //     }
    //     else{
    //         titleSectionTextWithoutToken.push(value);
    //     }
    // })
    // titleSectionTextWithoutToken.forEach((value) => {
    //     markDownText += value + "\n\n";
    // })
    return keepMarkDownText;
}
function writeResourceSection(resourceJson,hostValue){
    let resourceHref = resourceJson.href;
    // let attributes = resourceJson.hrefVariables;
    let resourceSectionText = "";
    let attributeText = writeAttributesSection(resourceJson.hrefVariables);
    let isOneTransition = resourceJson.transitions.length <= 1;
    let resourceTitle = "";
    let OneResourceText = "";
    let resourceUrl = hostValue + resourceHref;
    if (hostValue[hostValue.length-1] === "/"){
        resourceUrl = hostValue.substring(0,hostValue.length-1) + resourceHref;
    }

    resourceJson?.copies.forEach((value) => {
        // if (value[0] === "#"){
        //     resourceSectionText += value.substring(2,value.length) + "\n\n";
        // }
        // else{
        //     resourceSectionText += value + "\n\n";
        // }
        resourceSectionText += value + "\n\n";
    })
    if (isOneTransition){
        resourceTitle = resourceJson.transitions[0].title;
        let httpMethod = resourceJson.transitions[0].httpRequest.method;
        resourceJson.transitions[0].copies.forEach((value) => {
            resourceSectionText += value + "\n\n";
        })
        OneResourceText += "# " + resourceTitle + "\n\n";
        let transitionTextJson = writeTransitionSection(resourceJson.transitions[0],isOneTransition,resourceHref,resourceUrl);
        OneResourceText += transitionTextJson.firstPart;

        OneResourceText += resourceSectionText;
        OneResourceText += "`" + httpMethod + " " + resourceHref + "`\n\n";
        if (attributeText !== null){
            OneResourceText += "**URI Parameters**\n\n";
            OneResourceText += attributeText;
        }
        OneResourceText += transitionTextJson.secondPart;
    }
    else{
        resourceTitle = resourceJson.title;
        OneResourceText += "# " + resourceTitle + "\n\n";
        OneResourceText += resourceSectionText;
        OneResourceText += "`" + resourceHref + "`\n\n";
        if (attributeText !== null){
            OneResourceText += "**URI Parameters**\n\n";
            OneResourceText += attributeText;
        }
        resourceJson.transitions.forEach((oneTransition) => {
            let transitionText = writeTransitionSection(oneTransition,isOneTransition,resourceHref,resourceUrl);
            OneResourceText += transitionText;
        })
    }
    return OneResourceText;
}
function writeAttributesSection(attributes){
    if (attributes.length === 0){
        return null;
    }
    let attributeText = "";
    attributeText += "Title | Description | Key | value | typeAttributes" + "\n";
    attributeText += "----- | ----------- | --- | ----- | --------------" + "\n";
    attributes.forEach((oneAttribute) => {
        let typeAttributes = "";
        oneAttribute.typeAttributes.forEach((value) => {
            typeAttributes += value + ","
        })
        typeAttributes = typeAttributes.substring(0,typeAttributes.length-1);
        // console.log(value2.description);
        let oneAttributeDescription = oneAttribute.description.replace("|","_-_");
        // console.log(dataStructureDescription);
        attributeText += oneAttribute.title + " | " + oneAttributeDescription + " | " + oneAttribute.key + " | " + oneAttribute.value + " | " + typeAttributes + "\n";
    })
    attributeText += "\n";
    return attributeText;
}
function writeTransitionSection(oneTransition,isOneTransition,href,resourceUrl){
    let transitionTitle = oneTransition.title;
    let transitionTextSection = "";

    let httpMethod = oneTransition.httpRequest.method;

    let requestHeaderAttributes = "";
    let requestFirstLineTable = "";
    let requestDashLine = "";
    let requestInsideTable = "";
    oneTransition.httpRequest.headerAttributes.forEach((value) => {
        requestFirstLineTable += value.key + " | ";
        for (let i = 0 ; i<value.key.length;i++){
            requestDashLine += "-"
        }
        requestDashLine += " | ";
        requestInsideTable += value.value + " | ";
    })
    requestFirstLineTable = requestFirstLineTable.substring(0,requestFirstLineTable.length-3);
    requestDashLine = requestDashLine.substring(0,requestDashLine.length-3);
    requestInsideTable = requestInsideTable.substring(0,requestInsideTable.length-3);
    requestHeaderAttributes = requestFirstLineTable + "\n" + requestDashLine + "\n" + requestInsideTable + "\n\n";

    let dataStructure = "";
    let requestMessageBody = "";
    let requestMessageBodyContent = "";
    let requestMessageBodySchema = "";
    let requestMessageBodySchemaContent = "";
    oneTransition.httpRequest.sections.forEach((value) => {
        if (value.type === "dataStructure"){
            dataStructure += "Key | Value | TypeAttributes | Description" + "\n";
            dataStructure += "--- | ----- | -------------- | -----------" + "\n";
            value.members.forEach((value2) => {
                let typeAttributes = "";
                value2.typeAttributes.forEach((value3) => {
                    typeAttributes += value3 + ",";
                })
                typeAttributes = typeAttributes.substring(0,typeAttributes.length-1);
                let dataStructureValue = value2.value;
                if (typeof value2.value === "number" || typeof value2.value === "boolean"){
                    dataStructureValue = dataStructureValue.toString();
                }
                else if (typeof value2.value === "object"){
                    dataStructureValue = [];
                    if (value2.value instanceof Array){
                        value2.value.forEach((value3) => {
                            dataStructureValue.push(value3.content);
                        })
                    }
                    else{
                        dataStructureValue.push(value2.value.content);
                    }
                    dataStructureValue = JSON.stringify(dataStructureValue);
                }
                // console.log(value2.description);
                // let dataStructureDescription = value2.description.replace("|","_-_");
                // console.log(dataStructureDescription);
                dataStructure += value2.key + " | " + dataStructureValue + " | " + typeAttributes + " | " + value2.description + "\n";
            })
            dataStructure += "\n";
        }
        else if (value.type === "messageBody"){
            requestMessageBody += "contentType: " + value.contentType;
            try{
                requestMessageBodyContent = JSON.parse(value.content);
            }
            catch (e){
                requestMessageBodyContent = value.content;
            }

        }
        else if (value.type === "messageBodySchema"){
            requestMessageBodySchema += "contentType: " + value.contentType;
            requestMessageBodySchemaContent = JSON.parse(value.content);
        }
    })

    let statusCode = oneTransition.httpResponse.statusCode;
    let responseHeaderAttributes = "";
    let responseFirstLineTable = "";
    let responseDashLine = "";
    let responseInsideTable = "";
    oneTransition.httpResponse.headerAttributes.forEach((value) => {
        responseFirstLineTable += value.key + " | ";
        for (let i = 0 ; i<value.key.length;i++){
            responseDashLine += "-"
        }
        responseDashLine += " | ";
        responseInsideTable += value.value + " | ";
    })
    responseFirstLineTable = responseFirstLineTable.substring(0,responseFirstLineTable.length-3);
    responseDashLine = responseDashLine.substring(0,responseDashLine.length-3);
    responseInsideTable = responseInsideTable.substring(0,responseInsideTable.length-3);
    responseHeaderAttributes = responseFirstLineTable + "\n" + responseDashLine + "\n" + responseInsideTable + "\n\n";

    let responseMessageBody = "";
    let responseMessageBodyContent = "";
    oneTransition.httpResponse.sections.forEach((value) => {
        if (value.type === "messageBody"){
           // console.log(value.content);
            responseMessageBody += "contentType: " + value.contentType;
            try{
                responseMessageBodyContent = JSON.parse(value.content);
            }
            catch (e){
                responseMessageBodyContent = value.content;
            }
            // responseMessageBodyContent = JSON.parse(value.content);
        }
    })

    requestMessageBodyContent = JSON.stringify(requestMessageBodyContent,null,4);
    responseMessageBodyContent = JSON.stringify(responseMessageBodyContent,null,4);

    let RawText = "```plaintext\n";
    RawText += requestMessageBodyContent + "\n";
    RawText += "```\n\n";
    let curlText = createCurlText(httpMethod,oneTransition.httpRequest.headerAttributes,requestMessageBodyContent,resourceUrl);
    let pythonText = createPythonText(requestMessageBodyContent,oneTransition.httpRequest.headerAttributes,resourceUrl);
    let javaText = createJavaText(resourceUrl,httpMethod,requestMessageBodyContent,oneTransition.httpRequest.headerAttributes);
    let phpText = createPhpText(resourceUrl,requestMessageBodyContent,oneTransition.httpRequest.headerAttributes);
    let csharpText = createCsharpText(resourceUrl,oneTransition.httpRequest.headerAttributes,httpMethod,requestMessageBodyContent);

    let jsonText = "```json\n";
    jsonText += responseMessageBodyContent + "\n";
    jsonText += "```\n\n";


    if (isOneTransition){
        transitionTextSection += "> Request\n\n";
        transitionTextSection += RawText;
        transitionTextSection += curlText;
        transitionTextSection += pythonText;
        transitionTextSection += javaText;
        transitionTextSection += phpText;
        transitionTextSection += csharpText;
        transitionTextSection += "> Response " + statusCode + "\n\n";
        if (oneTransition.httpResponse.headerAttributes.length === 1){
            transitionTextSection += "> " + oneTransition.httpResponse.headerAttributes[0].key + ": " + oneTransition.httpResponse.headerAttributes[0].value + "\n\n";
        }
        transitionTextSection += jsonText;
        let returnJson = {firstPart:transitionTextSection};
        let transitionTextSection2 = "";
        if (oneTransition.httpRequest.headerAttributes.length >=1){
            transitionTextSection2 += "**Request Header**\n\n";
            transitionTextSection2 += requestHeaderAttributes;
        }
        if (dataStructure !== ""){
            transitionTextSection2 += "**Request DataStructure**\n\n";
            transitionTextSection2 += dataStructure;
        }
        if (oneTransition.httpResponse.headerAttributes.length > 1){
            transitionTextSection2 += "**Response Header**\n\n";
            transitionTextSection2 += responseHeaderAttributes;
        }
        returnJson["secondPart"] = transitionTextSection2;
        return returnJson;
    }
    else{
        transitionTextSection += "## " + transitionTitle + "\n\n";
        transitionTextSection += "> Request\n\n";
        transitionTextSection += RawText;
        transitionTextSection += curlText;
        transitionTextSection += pythonText;
        transitionTextSection += javaText;
        transitionTextSection += phpText;
        transitionTextSection += csharpText;
        transitionTextSection += "> Response " + statusCode + "\n\n";
        if (oneTransition.httpResponse.headerAttributes.length === 1){
            transitionTextSection += "> " + oneTransition.httpResponse.headerAttributes[0].key + ": " + oneTransition.httpResponse.headerAttributes[0].value + "\n\n";
        }
        transitionTextSection += jsonText;
        oneTransition.copies.forEach((value) => {
            transitionTextSection += value + "\n\n";
        })
        transitionTextSection += "`" + httpMethod + " " + href + "`\n\n";
        if (oneTransition.httpRequest.headerAttributes.length >=1){
            transitionTextSection += "**Request Header**\n\n";
            transitionTextSection += requestHeaderAttributes;
        }
        if (dataStructure !== ""){
            transitionTextSection += "**Request DataStructure**\n\n";
            transitionTextSection += dataStructure;
        }
        if (oneTransition.httpResponse.headerAttributes.length > 1){
            transitionTextSection += "**Response Header**\n\n";
            transitionTextSection += responseHeaderAttributes;
        }
        return transitionTextSection;
    }
}
function createCurlText(httpMethod,requestHeaderAttributes,requestMessageBodyContent,resourceUrl){
    let curlText = "```shell\n";
    curlText += "curl  --request " + httpMethod +  " \\ \n";
    curlText += "     ";
    for (let i = 0 ; i<requestHeaderAttributes.length;i++){
        curlText += " --header \"" + requestHeaderAttributes[i].key + ": " + requestHeaderAttributes[i].value + "\"";
    }
    curlText += " \\\n"
    curlText += "      --data-binary " + requestMessageBodyContent + " \\\n";
    curlText += "      " + resourceUrl + "\n";
    curlText += "```\n\n";
    return curlText;
}
function createPythonText(requestMessageBodyContent,requestHeaderAttributes,resourceUrl){
    let pythonText = "```python\n";
    pythonText +=
    "from urllib2 import Request, urlopen\n" +
    "\n" +
    "values = \"\"\"\n";
    pythonText += requestMessageBodyContent + "\n" +
    "\"\"\"\n" +
    "\n" +
    "headers = {\n";
    pythonText += "  ";
    for (let i = 0 ; i<requestHeaderAttributes.length;i++){
        pythonText += "\'" + requestHeaderAttributes[i].key + "\'" + ": " + "\'" + requestHeaderAttributes[i].value + "\'" + ",";
    }
    pythonText += "\n" +
    "}\n" +
    "request = Request('" + resourceUrl + "', data=values, headers=headers)\n" +
    "\n" +
    "response_body = urlopen(request).read()\n" +
    "print(response_body)\n" +
    "```\n\n";
    return pythonText;
}
function createJavaText(resourceUrl,httpMethod,requestMessageBodyContent,requestHeaderAttributes){
    let javaText = "```java\n";
    javaText += "import java.lang.System;\n" +
        "import java.net.HttpURLConnection;\n" +
        "import java.io.OutputStream;\n" +
        "import java.net.URL;\n" +
        "import java.nio.charset.StandardCharsets;\n" +
        "import java.net.URLConnection;\n" +
        "import java.io.InputStreamReader;\n" +
        "import java.io.BufferedReader;\n" +
        "\n" +
        "class MyRequest {\n" +
        "\n" +
        "    public static void main(String[] args){\n" +
        "        try{\n" +
        "            URL url = new URL(\"" + resourceUrl +"\");\n" +
        "            URLConnection con = url.openConnection();\n" +
        "            HttpURLConnection http = (HttpURLConnection)con;\n" +
        "            http.setRequestMethod(\"" + httpMethod + "\");\n" +
        "            http.setDoOutput(true);\n" +
        "\n" +
        "            byte[] out = \"" + requestMessageBodyContent + "\".getBytes(StandardCharsets.UTF_8);\n" +
        "            int length = out.length;\n" +
        "\n" +
        "            http.setFixedLengthStreamingMode(length);\n";
    for (let i = 0 ; i<requestHeaderAttributes.length;i++){
        javaText += "            http.setRequestProperty(\"" + requestHeaderAttributes[i].key + "\"" + ", " + "\"" + requestHeaderAttributes[i].value + "\"" + ");\n";
    }
    javaText +=
        "            http.connect();\n" +
        "            try(OutputStream os = http.getOutputStream()) {\n" +
        "                os.write(out);\n" +
        "            }\n" +
        "\n" +
        "            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));\n" +
        "            String inputLine;\n" +
        "            while ((inputLine = in.readLine()) != null)\n" +
        "                System.out.println(inputLine);\n" +
        "            in.close();\n" +
        "        }\n" +
        "        catch(Exception e){\n" +
        "            System.err.println(e);\n" +
        "        }\n" +
        "    }\n" +
        "}\n";
    javaText += "```\n\n";
    return javaText;
}
function createPhpText(resourceUrl,requestMessageBodyContent,requestHeaderAttributes){
    let phpText = "```php\n";
    phpText += "<?php\n" +
    "\n" +
    "  $url = \"" + resourceUrl +"\";\n" +
    "  $content = json_encode(\n" +
    "      '" + requestMessageBodyContent + "');\n" +
    "  $curl = curl_init($url);\n" +
    "  curl_setopt($curl, CURLOPT_HEADER, false);\n" +
    "  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);\n" +
    "  curl_setopt($curl, CURLOPT_HTTPHEADER,\n" +
    "          array(\n";
    for (let i = 0 ; i<requestHeaderAttributes.length;i++){
        phpText += "              \"" + requestHeaderAttributes[i].key + ": " + requestHeaderAttributes[i].value + "\"" + ",\n";
    }
    phpText +=
    "              );\n" +
    "  curl_setopt($curl, CURLOPT_POST, true);\n" +
    "  curl_setopt($curl, CURLOPT_POSTFIELDS, $content);\n" +
    "\n" +
    "  $json_response = curl_exec($curl);\n" +
    "\n" +
    "  $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);\n" +
    "\n" +
    "  if ( $status != 200 ) {\n" +
    "      die(\"Error: call to URL $url failed with status $status, response $json_response, curl_error \" . curl_error($curl) . \", curl_errno \" . curl_errno($curl));\n" +
    "  }\n" +
    "\n" +
    "\n" +
    "  curl_close($curl);\n" +
    "\n" +
    "  $response = json_decode($json_response, true);\n" +
    "?>\n";
    phpText += "```\n\n";
    return phpText;
}
function createCsharpText(resourceUrl,requestHeaderAttributes,httpMethod,requestMessageBodyContent){
    let csharpText = "```csharp\n";
    csharpText += "using System;\n" +
        "using System.IO;\n" +
        "using System.Net;\n" +
        "using System.Collections.Generic;\n" +
        "\n" +
        "namespace MyRequest\n" +
        "{\n" +
        "    class Program\n" +
        "    {\n" +
        "        static void Main(string[] args)\n" +
        "        {\n" +
        "            var httpWebRequest = (HttpWebRequest)WebRequest.Create(\"" + resourceUrl + "\");\n";
    for (let i = 0 ; i<requestHeaderAttributes.length;i++){
        csharpText += "            httpWebRequest.Headers[\"" + requestHeaderAttributes[i].key + "\"]= \"" + requestHeaderAttributes[i].value + "\"" + ";\n";
    }
    csharpText +=
        "\n" +
        "            httpWebRequest.Method = \"" + httpMethod + "\";\n" +
        "\n" +
        "            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))\n" +
        "            {\n" +
        "                string json = \"" + requestMessageBodyContent +
        "\";\n" +
        "\n" +
        "                streamWriter.Write(json);\n" +
        "                streamWriter.Flush();\n" +
        "                streamWriter.Close();\n" +
        "            }\n" +
        "\n" +
        "            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();\n" +
        "            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))\n" +
        "            {\n" +
        "                var result = streamReader.ReadToEnd();\n" +
        "                Console.WriteLine(result);\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}\n";
    csharpText += "```\n\n";
    return csharpText;
}
module.exports = turnParsedApibToSlateMarkdown;