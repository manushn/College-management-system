import os from "os";
import fs from "fs";

const interfaces = os.networkInterfaces();
let ip = "localhost";

for (let iface of Object.values(interfaces)) {
  for (let alias of iface) {
    if (alias.family === "IPv4" && !alias.internal) {
      ip = alias.address;
    }
  }
}

let envContent = "";
if (fs.existsSync(".env")) {
  envContent = fs.readFileSync(".env", "utf8");
  envContent = envContent.replace(/^VITE_BACKEND_URL=.*$/m, "");
  envContent = envContent.trim() + "\n";
}

envContent += `VITE_BACKEND_URL=http://${ip}:4000\n`;
fs.writeFileSync(".env", envContent);

console.log(`.env updated: VITE_BACKEND_URL=http://${ip}:4000`);