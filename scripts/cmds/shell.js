const { exec } = require('child_process');

module.exports = {
  config: {
    name: "shell",
    version: "1.0",
    author: "Samir // Eren Yeager",
    countDown: 5,
    role: 2,
    shortDescription: "Execute shell commands",
    longDescription: "Executes terminal shell commands from chat",
    category: "shell",
    guide: {
      vi: "{p}{n} <command>",
      en: "{p}{n} <command>"
    }
  },

  onStart: async function ({ args, message, event }) {
    const allowedUIDs = ["6157399136513", "61572915213085"]; // Only these UIDs can use this command

    if (!allowedUIDs.includes(event.senderID)) {
      return message.reply("⚠️ Sorry! You're not allowed to use this command.");
    }

    const command = args.join(" ");
    if (!command) {
      return message.reply("Please provide a command to execute.");
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return message.reply(`❌ Error:\n${error.message}`);
      }

      if (stderr) {
        return message.reply(`⚠️ Stderr:\n${stderr}`);
      }

      const output = stdout || "✅ Command executed successfully, but no output.";
      message.reply(`✅ Output:\n${output}`);
    });
  }
};
