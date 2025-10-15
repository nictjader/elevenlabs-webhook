import express from 'express';
import path from 'path';

const app = express();

// Middleware to parse JSON bodies (required for webhook payload)
app.use(express.json());

// Optional: Serve static HTML from public folder (keeps template behavior)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Your ElevenLabs Webhook Endpoint
app.post('/api/webhook', (req, res) => {
  const body = req.body;
  console.log('Webhook received:', JSON.stringify(body, null, 2));

  // Extract the summary from ElevenLabs data collection
  const summary = body.data?.analysis?.data_collection_results?.faucet_summary?.value;

  if (summary) {
    console.log('Extracted Summary:', summary);

    // TODO: Send SMS via Twilio
    // Example (uncomment when ready):
    // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // await client.messages.create({
    //   body: summary,
    //   from: process.env.TWILIO_PHONE,
    //   to: process.env.PLUMBER_PHONE
    // });
  }

  // Respond to ElevenLabs
  res.status(200).json({ received: true });
});

// Optional: Keep the example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

export default app;
