module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    author: "Nazrul", //don’t change author!
    countDown: 5,
    role: 0,
    description: "chat with bot",
    category: "what",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async ({}) => {},
  onChat: async ({ api, event, usersData }) => {
    const data = await usersData.get(event.senderID);
    const name = data.name || "Darling";
    const messages = [
      "এতো বট বট করলে লিভ নিবো কিন্তু 😒",
      "সাদা সাদা কালা কালা আমি মানুষ অনেক ভালা 😁",
      "হুম জান বলো শুনছি...😗",
      "আমাকে না ডেকে লিখন বস রে একটা গোফ দে",
      "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
      "তোর সাহস ক্যামনে হইলো আমাকে বট বলে ডাকোস 😤",
      "তুই নিজে বট 😒🔪",
      "না চিল্লাইয়া এবার কো শুনছি ",
      "দুই মিনিট সাইডে আসিস তো কথা আছে 😾🔪",
      "দুই টাকা দিয়ে মিস কল দিতে গিয়ে এখন দেখি দশ টাকা খরচ হয়ে গেছে 😟",
      "আর যাবো না বেগুন তুলিতে 🤭",
      "আমি আপনাকে কিভাবে সাহায্য করতে পারি...? 🤔",
      "আদেশ করুন বস...🙂",
      "হুম শুনছি আমি আপনি বলুন 😐",
      "আমার সব কমান্ড দেখতে /help টাইপ করুন ✅",
      "আসসালামু'আলাকুম জি বলুন কি করতে পারি আপনার জন্য 😊",
      "আদেশ করুন যাহাপানা 😎",
      "আবার যদি আমারে বট কইয়া ডাক দেছ তাইলে তোর বিয়ে হবে না 🫤😏",
      "তোগো বাড়ির জামাই আমি সম্মান দে 😼",
      "তুই বট তোর নানি বট 😤 তোর কত বড় সাহস তুই আমারে বট কস 😤",
      "আপনার কি চরিত্রে সমস্যা যে এতো বার আমাকে ডাকতেছেন 🤨",
      "ডাকছোত কেন ফাস্ট কো 😒",
      "তুমি কি আমাকে ডেকেছো...? 😇"
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const nl = event.body.toLowerCase();

    if (
      nl.startsWith("bott") ||
      nl.startsWith("bot") ||
      nl.startsWith("রোবট") ||
      nl.startsWith("বট") ||
      nl.startsWith("robot")
    ) {
      const response = {
        body: `‎╭────────────❍\n╰➤ 👤 𝐃𝐞𝐚𝐫『${name}』,\n╰➤ 🗣️ ${randomMessage}\n╰─────────────────➤`
      };
      return api.sendMessage(response, event.threadID, event.messageID);
    }
  }
};
