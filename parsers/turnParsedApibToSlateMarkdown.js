const fs = require('fs');

let websocketCode = `from websocket import create_connection 

def make_socket_connection(url, header):
    socket = create_connection(url, header=header)
    return socket

def read_wave_file_as_binary(wave_file):
    with open(wave_file ,'rb') as f:
        binary=f.read()
        return binary

def convert_wave_to_text(binary, socket, window_size=32000):
    number_of_window = (len(binary) + 1) // window_size
    for i in range(number_of_window):
        socket.send_binary(binary[window_size*i:window_size*(i+1)])
        data = socket.recv()
    socket.send("finalize")
    data= socket.recv()
    socket.close()

def main():
    header = {'Authorization' : 'Token ...'}
    url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/wav/sync/"
    wave_file = "Your wave file path"
    binary = read_wave_file_as_binary(wave_file)
    socket = make_socket_connection(url, header)
    convert_wave_to_text(binary, socket)
main()
`;

let websocketHarfCurl =  `\`\`\`shell\ncurl -X
POST --header "Authorization: Token TOKEN_KEY"
-F "media=@example.mp3"
http://harf.roshan-ai.ir/api/transcribe_files/\n\`\`\`\n\n`;

let apiTitleGlobal = "";

function turnParsedApibToSlateMarkdown(jsonText,fileName){
    let parsedApibJson = JSON.parse(jsonText);
    let apiTitle = parsedApibJson.title;
    let markDownText = "---\n" +
        "title: API Reference\n" +
        "\n" +
        "language_tabs: # must be one of https://git.io/vQNgJ\n" +
        "  - shell: CURL\n" +
        // "  - java: JAVA\n" +
        "  - plaintext: RAW\n" +
        "  - python: PYTHON\n" +
        // "  - php: PHP\n" +
        // "  - csharp: C#\n" +
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

        apiTitleGlobal = apiTitle;
    markDownText += writeApiTitleSection(parsedApibJson);

    let hostValue = "";


    parsedApibJson.attributes.forEach((value) => {
        if (value.key === "HOST"){
            hostValue = value.value;
        }
    })
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

    parsedApibJson.copies.forEach((value) => {
        keepMarkDownText += value + "\n\n";
    })
    return keepMarkDownText;
}

const writeParameters = (json) => {
    let parametersText = '';

    if(json.hrefVariables.length !== 0) {
        parametersText += '<p style="font-size: 20px;font-family:IRANYekan;">پارامترهای ورودی</p>\n';
    parametersText += `<table style="float:right;text-align:center;font-family:IRANYekan;">
    <tr>
        <th>
            توضیحات
        </th>
        <th>
            کلید
        </th>
    </tr>`;
        json.hrefVariables.forEach((item) => {
            let parameterRow = "\n<tr>\n";
            let required = 'normal';
            if(item.typeAttributes[0] === 'required') {
                required = 'bold';
            }
            parameterRow += `<td>\n${item.description}\n</td>\n`;
            parameterRow += `<td style="font-weight: ${required}">\n${item.key}\n</td>\n`;
            parameterRow += `</tr>`;

            parametersText += parameterRow;
        });
        parametersText += "</table>\n\n";
    }

    return parametersText;
}

function writeResourceSection(resourceJson,hostValue){
    let resourceHref = resourceJson.href;
    // let attributes = resourceJson.hrefVariables;
    let resourceSectionText = "";
    resourceSectionText += writeParameters(resourceJson);
    let attributeText = writeAttributesSection(resourceJson.hrefVariables);
    let isOneTransition = resourceJson.transitions.length <= 1;
    let resourceTitle = "";
    let OneResourceText = "";
    let resourceUrl = hostValue + resourceHref;
    if (hostValue[hostValue.length-1] === "/"){
        resourceUrl = hostValue.substring(0,hostValue.length-1) + resourceHref;
    }

    resourceJson.copies.forEach((value) => {
        resourceSectionText += value + "\n\n";
    })
        resourceTitle = resourceJson.title;
        OneResourceText += "# " + resourceTitle + "\n\n";
        OneResourceText += resourceSectionText;
        if (attributeText !== null){
            OneResourceText += attributeText;
        }
        resourceJson.transitions.forEach((oneTransition) => {
            let transitionText = writeTransitionSection(oneTransition,isOneTransition,resourceHref,resourceUrl);
            OneResourceText += transitionText;
        })
    return OneResourceText;
}
function writeAttributesSection(attributes){
    return "\n";
}
function writeTransitionSection(oneTransition,isOneTransition,href,resourceUrl){
    let transitionTitle = oneTransition.title;
    let transitionTextSection = "";

    let httpMethod = oneTransition.httpRequest.method;

    let dataStructure = "";
    let requestMessageBody = "";
    let requestMessageBodyContent = "";
    let requestMessageBodySchema = "";
    let requestMessageBodySchemaContent = "";
    oneTransition.httpRequest.sections.forEach((value) => {
        if (value.type === "dataStructure"){
            value.members.forEach((data) => {
                let keyString = data.key ;
                let value;
                if (data.valueType === "array") {
                    value = "[";
                    data.value.forEach((element) => {
                        value += element.content + ", ";
                    })
                    value += "]";
                } else if(data.valueType === "enum") {
                    value = '\n<span className="enum-container">\n';
                    data.enumaration.forEach((element) => {
                        let elementMarkdown = `<span>
${element.name}
</span>
<span style="font-family:VazirCode;">
${element.meta}
</span>
`;
                        value += elementMarkdown;
                    })
                    value += '\n</span>';
                } else {
                    value = `<span style="background-color: #00A693;
                    border-color: #00A693;
                    border-width: 3px;
                    border-radius: 2px">
                    ${data.value}
                    </span>`;
                }
                if (data.typeAttributes[0] === 'required') {
                    keyString += "(required)";
                }
                dataStructure += `<dl>
<strong>${keyString}</strong>
<br>
<br>
Value: ${value}
</dl>

<p style="direction:rtl;font-weight:300;">\n<img src="./images/vector.svg" alt="vector">  ${data.description}</p>\n<br><br>\n`;
            })
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

    let responseMessageBody = "";
    let responseMessageBodyContent = "";
    oneTransition.httpResponse.sections.forEach((value) => {
        if (value.type === "messageBody"){
            responseMessageBody += "contentType: " + value.contentType;
            responseMessageBodyContent = value.content;
        }

    })
    requestMessageBodyContent = JSON.stringify(requestMessageBodyContent,null,4);

    let curlText = createCurlText(httpMethod,oneTransition.httpRequest.headerAttributes,requestMessageBodyContent,resourceUrl);
    let pythonText = createPythonText(requestMessageBodyContent,oneTransition.httpRequest.headerAttributes,resourceUrl);
    // let javaText = createJavaText(resourceUrl,httpMethod,requestMessageBodyContent,oneTransition.httpRequest.headerAttributes);
    // let phpText = createPhpText(resourceUrl,requestMessageBodyContent,oneTransition.httpRequest.headerAttributes);
    // let csharpText = createCsharpText(resourceUrl,oneTransition.httpRequest.headerAttributes,httpMethod,requestMessageBodyContent);

    let RawText = "```plaintext\n";
    if(oneTransition.httpRequest.headerAttributes.length !== 0 && 
        oneTransition.httpRequest.headerAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
            RawText += websocketCode + "\n";  
    } else {
        RawText += requestMessageBodyContent + "\n";
    }
    RawText += "```\n\n";
    
    let jsonText = "";

    if(responseMessageBodyContent !== "") {
        jsonText += "```json\n";
        jsonText += responseMessageBodyContent + "\n";
        jsonText += "```\n\n";
    }

        transitionTextSection += "## " + transitionTitle + "\n\n";
        transitionTextSection += "> Request\n\n";
        transitionTextSection += RawText;
        transitionTextSection += curlText;
        transitionTextSection += pythonText;
        // transitionTextSection += javaText;
        // transitionTextSection += phpText;
        // transitionTextSection += csharpText;
        transitionTextSection += "> Response " + "\n\n";
        if (oneTransition.httpResponse.headerAttributes.length === 1){
            transitionTextSection += "> " + oneTransition.httpResponse.headerAttributes[0].key + ": " + oneTransition.httpResponse.headerAttributes[0].value + "\n\n";
        }
        transitionTextSection += jsonText;
        oneTransition.copies.forEach((value) => {
            transitionTextSection += value + "\n\n";
        })
        transitionTextSection += '<dl style="background-color:transparent;"><code>' + httpMethod + " " + href + "</code></dl>\n\n";
        if (dataStructure !== ""){
            transitionTextSection += dataStructure;
        }
        return transitionTextSection;
}
function createCurlText(httpMethod,requestHeaderAttributes,requestMessageBodyContent,resourceUrl){
    if (requestHeaderAttributes.length !== 0 && requestHeaderAttributes[0].value === "multipart/form-data; boundary={boundary value}") {
      if(apiTitleGlobal === "الفبا") {
        return  `\`\`\`shell\ncurl -X
        POST --header "Authorization: Token TOKEN_KEY"
        -F "document=@example.pdf"
        http://alefba.roshan-ai.ir/api/read_document\n\`\`\`\n\n`;
    } else if(apiTitleGlobal === "حرف") {
        return websocketHarfCurl;
    }
    }

    if (requestHeaderAttributes.length !== 0 && 
        requestHeaderAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
        return `\`\`\`shell\n${websocketCode}\n\`\`\`\n\n`;
    }

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
    if (requestHeaderAttributes.length !== 0 && requestHeaderAttributes[0].value === "multipart/form-data; boundary={boundary value}") {
        
        if(apiTitleGlobal === "الفبا") {
            return `\`\`\`python\nimport requests

headers = {'Authorization': 'Token TOKEN_KEY',}
files = {'document': ('FILE NAME', open('YOUR FILE PATH', 'rb')),}
response = requests.post('https://alefba.roshan-ai.ir/api/read_document/', headers=headers, files=files)
print(response)\n\`\`\`\n\n`;
        } else if(apiTitleGlobal === "حرف") {
            return `\`\`\`python\n${websocketCode}\n\`\`\`\n\n`;
        }
    }

    if (requestHeaderAttributes.length !== 0 && 
        requestHeaderAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
        return `\`\`\`python\n${websocketCode}\n\`\`\`\n\n`;
    }

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
    if (requestHeaderAttributes.length !== 0 && requestHeaderAttributes[0].value === "multipart/form-data; boundary={boundary value}") {
        return `\`\`\`java\nimport java.io.*;
import java.net.*;
import java.nio.file.Files;

public class MultiPartRequest {
  public static void main(String[] args) throws IOException {

    String url = "https://alefba.roshan-ai.ir/api/read_document/";
    File textFile = new File("YOUR FILE PATH");
    String boundary = Long.toHexString(System.currentTimeMillis());
    String CRLF = "\\r\\n";

    URLConnection connection = new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setRequestProperty("accept", "*/*");
    connection.setRequestProperty("Connection", "close");
    connection.setRequestProperty("Authorization", "Token TOKEN_KEY");
    connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

    try (
        OutputStream output = connection.getOutputStream();
        PrintWriter writer = new PrintWriter(new OutputStreamWriter(output), true);
    ) {
      writer.append("--").append(boundary).append(CRLF);
      writer.append("Content-Disposition: form-data; name=\\"document\\"; filename=\\"").append(textFile.getName()).append("\\"").append(CRLF);
      writer.append("Content-Type: application/pdf").append(CRLF);
      writer.append(CRLF).flush();
      Files.copy(textFile.toPath(), output);
      output.flush();
      writer.append(CRLF).flush();
      writer.append("--").append(boundary).append("--").append(CRLF).flush();
    }


    BufferedReader inputStream = new BufferedReader(new InputStreamReader((InputStream) connection.getContent()));
    String inputLine;
    while ((inputLine = inputStream.readLine()) != null){
      System.out.println(inputLine);
    }
    inputStream.close();
  }
}\n\`\`\`\n\n`;
    }

    if (requestHeaderAttributes.length !== 0 && 
        requestHeaderAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
        return `\`\`\`java\n${websocketCode}\n\`\`\`\n\n`;
    }

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
    if (requestHeaderAttributes.length !== 0 && requestHeaderAttributes[0].value === "multipart/form-data; boundary={boundary value}") {
        return `\`\`\`php\n$fields = array("f1"=>"value1", "another_field2"=>"anothervalue");

$filenames = array("FILE_PATH_1", "FILE_PATH_2");

$files = array();
foreach ($filenames as $f){
   $files[$f] = file_get_contents($f);
}

$url = "https://alefba.roshan-ai.ir/api/read_document/";

$curl = curl_init();

$url_data = http_build_query($data);

$boundary = uniqid();
$delimiter = '-------------' . $boundary;

$post_data = build_data_files($boundary, $fields, $files);

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POST => 1,
  CURLOPT_POSTFIELDS => $post_data,
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer $TOKEN",
    "Content-Type: multipart/form-data; boundary=" . $delimiter,
  ),
));

$response = curl_exec($curl);

$info = curl_getinfo($curl);
var_dump($response);
$err = curl_error($curl);
echo "error";
var_dump($err);
curl_close($curl);

function build_data_files($boundary, $fields, $files){
    $data = '';
    $eol = "\\r\\n";
    $delimiter = '-------------' . $boundary;
    foreach ($fields as $name => $content) {
        $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . "\\"".$eol.$eol
            . $content . $eol;
    }
    foreach ($files as $name => $content) {
        $data .= "--" . $delimiter . $eol
            . 'Content-Disposition: form-data; name="' . $name . '"; filename="' . $name . '"' . $eol
            . 'Content-Type: image/png'.$eol
            . 'Content-Transfer-Encoding: binary'.$eol
            ;
        $data .= $eol;
        $data .= $content . $eol;
    }
    $data .= "--" . $delimiter . "--".$eol;
    return $data;
}\n\`\`\`\n\n`;
    }

    if (requestHeaderAttributes.length !== 0 && 
        requestHeaderAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
        return `\`\`\`php\n${websocketCode}\n\`\`\`\n\n`;
    }

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
    if (requestHeaderAttributes.length !== 0 && requestHeaderAttributes[0].value === "multipart/form-data; boundary={boundary value}") {
        return `\`\`\`csharp\nusing System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Threading;

namespace MyRequest
{
    class Program
    {
\t\tstatic async void UploadFile(String serverAddress,String filePath,String[] paramsName,String[] paramsValue){
\t\t\tusing (var formData = new MultipartFormDataContent()){
\t\t\t\tformData.Headers.ContentType.MediaType = "multipart/form-data";
\t\t\t\tvar filestream = new FileStream(filePath, FileMode.Open);
\t\t\t\tStream fileStream = System.IO.File.OpenRead(filePath);
\t\t\t\tvar fileName = System.IO.Path.GetFileName(filePath);
\t\t\t\t
\t\t\t\tformData.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
\t\t\t\t{
\t\t\t\t\tFileName = fileName
\t\t\t\t};
\t\t\t\t
\t\t\t\tfor(int i = 0;i<paramsName.Length;i++){
\t\t\t\t\tvar stringContent = new StringContent(paramsValue[i]);
\t\t\t\t\tstringContent.Headers.Add("Content-Disposition", "form-data; name=\\"" + paramsName[i] + "\\"");
\t\t\t\t\tformData.Add(stringContent, paramsName[i]);
\t\t\t\t}
\t\t\t\t
\t\t\t\tformData.Add(new StreamContent(fileStream), "file", filename);
\t\t\t\t
\t\t\t\tusing (var client = new HttpClient()){
\t\t\t\t\tclient.DefaultRequestHeaders.Add("Authorization", "Token" + _bearerToken);
\t\t\t\t\t
\t\t\t\t\tvar response = await client.PostAsync(serverAddress, formData).Result;
\t\t\t\t\treturn response.ToString();
\t\t\t\t\t
\t\t\t\t\tvar message = await client.PostAsync(serverAddress, formData);
\t\t\t\t\tresult = await message.Content.ReadAsStringAsync();
\t\t\t\t\treturn result;
\t\t\t\t}
\t\t\t}
\t\t}
    }
}\n\`\`\`\n\n`;
    }

    if (requestHeaderAttributes.length !== 0 && 
        requestHeaderAttributes[0].value === "ws_api/transcribe_files/wav/sync/") {
        return `\`\`\`csharp\n${websocketCode}\n\`\`\`\n\n`;
    }

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
