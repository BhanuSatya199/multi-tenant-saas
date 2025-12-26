const { exec } = require("child_process");

exec(
  "npx node-pg-migrate up",
  { env: process.env },
  (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      process.exit(1);
    }
    console.log(stdout);
  }
);
