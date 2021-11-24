import java.lang.System;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.net.URLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;

class MyRequest {

    public static void main(String[] args){
        try{
            URL url = new URL("https://alefba.roshan-ai.ir/api/read_document/");
            URLConnection con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);

            File file = new File("YOUR FILE PATH");
            byte[] out = new byte[(int)file.length()];

            FileInputStream fileInputStream = new FileInputStream("YOUR FILE PATH");
            fileInputStream.read(out);
            fileInputStream.close();

            int length = out.length;

            http.setFixedLengthStreamingMode(length);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Authorization", "Token TOKEN_KEY");
            http.connect();
            try(OutputStream os = http.getOutputStream()) {
                os.write(out);
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        }

        catch(Exception e){
            System.err.println(e);
        }
    }
}