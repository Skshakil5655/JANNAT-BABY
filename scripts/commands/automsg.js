module.exports.config = {
    name: "autotime",
    version: "1.0.0",
    permission: 0,
    credits: "Nayan",
    description: "msg",
    prefix: true, 
    category: "user", 
    usages: "",
    cooldowns: 5,
    dependencies: {}
};

const nam = [
    { timer: '12:00:00 AM', message: ['~ এখন রাত ১১টা বাজে\nখাউয়া দাউয়া করে নেউ😙 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '1:00:00 AM', message: ['~ এখন রাত ১২টা বেজে গেলো সবাই শুয়ে পড়ো🤟 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '2:00:00 AM', message: ['~এখন রাত ১টা বাজে প্রেম না কইরা যাইয়া ঘুমা বেক্কল😾 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '3:00:00 AM', message: ['~এখন রাত ২টা বাজে যারা ছ্যাকা খাইছে তারা জেগে আছে🫠🫠। 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '4:00:00 AM', message: ['~এখন রাত ৩টা বাজে সবাই মনে হয় ঘুম🥹 আমার ভাই ঘুম আসে না  🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '5:00:00 AM', message: ['~এখন রাত ৪টা বাজে একটু পর ফজরের আযান দিলে নামাজ পড়ে নিও সবাই 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '6:00:00 AM', message: ['~এখন ভোর ৫টা বাজে সবাই নামাজ পড়ছো তো?❤️  🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '7:00:00 AM', message: ['~এখন সকাল ৬টা বাজে ঘুম থেকে উঠো সবাই  🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '8:00:00 AM', message: ['~এখন সকাল ৭টা বাজে সবাই ব্রেকফাস্ট করে নাও😊 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
    { timer: '9:00:00 AM', message: ['~এখন সকাল ৮ টা বাজে সবাই মনে হয় কাজে ব্যস্ত হয়ে গেছো 🥰🥰 𝒞𝓇𝑒𝒶𝓉𝑜𝓇 𝒮𝒽𝒶𝓀𝒾𝓁 🥰🥰'] },
];

module.exports.onLoad = o => setInterval(() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    const currentTime = new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim();
    const match = nam.find(i => i.timer == currentTime);
    if (match) global.data.allThreadID.forEach(i => o.api.sendMessage(r(match.message), i));
}, 1000);

module.exports.run = o => {};
