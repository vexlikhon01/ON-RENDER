const os = require('os');
const moment = require('moment-timezone');
const { createCanvas } = require('canvas');
const fs = require('fs');
const GIFEncoder = require('gifencoder');

module.exports = {
    config: {
        name: "ck",
        aliases: ["run", "stats"],
        version: "1.1",
        author: "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡",
        role: 0,
        shortDescription: {
            en: "Displays bot uptime, system information, and current time in Bangladesh."
        },
        longDescription: {
            en: "Displays bot uptime, system information, CPU speed, storage usage, RAM usage, and current time in Bangladesh."
        },
        category: "system",
        guide: {
            en: "Use {p}stats to display bot uptime, system information, and current time in Bangladesh."
        }
    },
    onStart: async function ({ api, event }) {
        try {
            const botUptime = process.uptime();
            const serverUptime = os.uptime(); // Get server uptime

            // Format bot uptime
            const botDays = Math.floor(botUptime / 86400);
            const botHours = Math.floor((botUptime % 86400) / 3600);
            const botMinutes = Math.floor((botUptime % 3600) / 60);
            const botSeconds = Math.floor(botUptime % 60);
            const botUptimeString = `${botDays} days, ${botHours} hours, ${botMinutes} minutes, ${botSeconds} seconds`;

            // Format server uptime
            const serverDays = Math.floor(serverUptime / 86400);
            const serverHours = Math.floor((serverUptime % 86400) / 3600);
            const serverMinutes = Math.floor((serverUptime % 3600) / 60);
            const serverSeconds = Math.floor(serverUptime % 60);
            const serverUptimeString = `${serverDays} days, ${serverHours} hours, ${serverMinutes} minutes, ${serverSeconds} seconds`;

            const totalMem = os.totalmem() / (1024 * 1024 * 1024);
            const freeMem = os.freemem() / (1024 * 1024 * 1024);
            const usedMem = totalMem - freeMem;
            const speed = os.cpus()[0].speed;

            const systemStatus = "🟢 Good System";

            // Set timezone to Bangladesh (Asia/Dhaka)
            const asiaTimezone = 'Asia/Dhaka';
            const now = moment().tz(asiaTimezone);
            const currentTime = now.format('YYYY-MM-DD HH:mm:ss');

            // Create a GIF with the information
            const encoder = new GIFEncoder(400, 300); // Reduced dimensions for smaller file size
            const gifPath = './uptime.gif';
            const stream = fs.createWriteStream(gifPath);

            encoder.createReadStream().pipe(stream);
            encoder.start();
            encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
            encoder.setDelay(500);  // frame delay in ms
            encoder.setQuality(10); // image quality. 10 is default.

            const canvas = createCanvas(400, 300); // Match reduced dimensions
            const ctx = canvas.getContext('2d');

            // Background colors for animation frames
            const bgColors = ['#ffffff'];

            // Text colors for animation frames
            const textColors = ['#000000', '#ff0000', '#00ff00', '#0000ff'];

            for (let i = 0; i < bgColors.length; i++) {
                // Draw background
                ctx.fillStyle = bgColors[i];
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw text
                ctx.fillStyle = textColors[i];
                ctx.font = '20px Arial'; // Adjusted font size for smaller canvas
                ctx.fillText('Alpha Bot Uptime:', 10, 30);
                ctx.fillText(botUptimeString, 10, 60);
                ctx.fillText('Server Uptime:', 10, 90);
                ctx.fillText(serverUptimeString, 10, 120);
                ctx.fillText('CPU Speed:', 10, 150);
                ctx.fillText(`${speed} MHz`, 10, 180);
                ctx.fillText('Memory Usage:', 10, 210);
                ctx.fillText(`Used: ${usedMem.toFixed(2)} GB / Total: ${totalMem.toFixed(2)} GB`, 10, 240);
                ctx.fillText('Current Time in Bangladesh:', 10, 270);
                ctx.fillText(currentTime, 10, 290);
                ctx.fillText(systemStatus, 10, 310);

                encoder.addFrame(ctx);
            }

            encoder.finish();

            // Ensure the file is fully written before sending
            stream.on('finish', () => {
                api.sendMessage(
                    { body: 'Here is the uptime information:', attachment: fs.createReadStream(gifPath) },
                    event.threadID,
                    (err) => {
                        if (err) {
                            console.error('Failed to send message:', err);
                            api.sendMessage('❌ Failed to send uptime information.', event.threadID);
                        }
                    }
                );
            });

            // Handle errors during file writing
            stream.on('error', (err) => {
                console.error('Error writing GIF file:', err);
                api.sendMessage('❌ Error generating uptime image.', event.threadID);
            });

        } catch (error) {
            console.error('Unexpected error:', error);
            api.sendMessage(`🔴 Bad System: An error occurred while retrieving data. ${error.message}`, event.threadID);

            if (module.exports.config.author !== "ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡") {
                return api.sendMessage("❌ Tant que vous n'aurez pas remis le nom du créateur de cette commande, vous ne pourrez pas l'utiliser.", event.threadID);
            }
        }
    }
};
