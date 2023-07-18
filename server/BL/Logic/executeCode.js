const fs = require("fs");
const { exec } = require("child_process");
const {
  create,
  read,
  update,
  remove,
} = require("../../DL/Controller/exerciseController.js");

const languageRunners = new Map();

const filePath = "Main.java"; // Update the file path to match your system

async function executeCode(req, res) {
  const language = req.body.language;
  const code = req.body.code;
  const testInputs = req.body.testInputs;

  try {
    const Runner = languageRunners.get(language);

    if (!Runner) {
      throw new Error(`Language '${language}' is not supported.`);
    }

    const runner = new Runner();
    const output = await runner.execute(code, testInputs);

    res.send(output);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

class JavaRunner {
  async execute(code, testInputs) {
    const javaCode = `
        import java.util.*;

        public class Main {
          public static void main(String[] args) {
            ${code}

            // Test the twoSum method
            int[] nums = {${testInputs.nums}};
            int target = ${testInputs.target};

            Solution solution = new Solution();
            int[] result = solution.twoSum(nums, target);

            System.out.println("Output: " + java.util.Arrays.toString(result));
          }
        }
      `;

    fs.writeFileSync(filePath, javaCode);

    await runDockerCommand("docker build -t java-runner ."); // Build the Docker image

    const logs = await runDockerCommand(
      `docker run --rm -v /git/FS/JS/Projects/LeetCode/server:/app java-runner` // Run the container with volume mounting
    );

    return logs;
  }
}

languageRunners.set("java", JavaRunner);

function runDockerCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}

module.exports = {
  executeCode,
};
