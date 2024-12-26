const express = require("express");
const bodyParser = require("body-parser");
const Twilio = require("twilio");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const app = express();
const port = 5000;

dotenv.config();

// إعداد Twilio
const twilioSid = process.env.YOUR_TWILIO_SID;
const twilioAuthToken = process.env.YOUR_TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.YOUR_TWILIO_PHONE_NUMBER;
const client = new Twilio(twilioSid, twilioAuthToken);

// إعداد ميدل وير
app.use(cors());
app.use(bodyParser.json());

// نقطة النهاية لإرسال الرسائل
app.post("/send-sms", (req, res) => {
  const { brand, phone, message } = req.body;

  if (!brand || !phone || !message) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  // إرسال الرسالة باستخدام Twilio
  client.messages
    .create({
      body: `Brand: ${brand}\nMessage: ${message}`,
      from: twilioPhoneNumber,
      to: phone,
    })
    .then((message) => {
      res.status(200).json({ message: "تم إرسال الرسالة بنجاح للعميل"});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء إرسال الرسالة للعميل"});
    });
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server running on Port http://localhost:${port}`);
});

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});