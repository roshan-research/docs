import os
import subprocess
from bs4 import BeautifulSoup
import re

def extract_curl_requests(directory):
    scripts_dir = "curl_scripts"
    os.makedirs(scripts_dir, exist_ok=True)
    subprocess.run(["cp", "docs/boute.pdf", f"{scripts_dir}/example.pdf"])

    results = []

    for subdir, dirs, files in os.walk(directory):
        for file in files:
            if file == "index.html":
                subdir_name = os.path.basename(subdir)
                script_filename = f"test-{subdir_name}.sh"
                script_path = os.path.join(scripts_dir, script_filename)
                file_path = os.path.join(subdir, file)
                with open(file_path, 'r') as f:
                    html_file = f.read()

                soup = BeautifulSoup(html_file, 'html.parser')
                pre_tags = soup.find_all('pre', class_='highlight shell tab-shell')

                with open(script_path, 'w') as f:
                    f.write("#!/bin/bash\n\n")

                    for pre in pre_tags:
                        code = pre.find('code')
                        code_text = code.get_text().strip()
                        if code_text.startswith('curl'):
                            token_env_var = f"${{{subdir_name.upper()}_TOKEN_KEY}}"
                            code_text = re.sub(r"\\[ \t]*\n", "", code_text)
                            code_text = code_text + ' -s -w " %{http_code}\n" | grep -oE "[0-9]{3}$" | awk "NR==1"'
                            code_text = code_text.replace("TOKEN_KEY", token_env_var)
                            f.write(f"{code_text}\n\n")
                
                print(f"script {script_filename} created.")

                subprocess.run(["chmod", "+x", script_path])
                result = subprocess.run(["bash", script_path], capture_output=True, text=True)
                output = result.stdout.strip()


                results.append((script_filename, output))

    print("curl requests extraction completed successfully.\n")

    print("Running curl requests...\n")


    for script, output in results:
        print(f"Script: {script}\n")
        print(f"Output:")
        print(f"{output}\n")
        print("============================\n")


extract_curl_requests("docs")
