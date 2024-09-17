
const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/urlModel'); // Ensure the path is correct

const app = express();
app.use(express.json());
app.post('/urls/saveEnrichedUrl', async (req, res) => {
    try {
        const { urls, enrichmentData } = req.body;

        if (!urls || !enrichmentData) {
            return res.status(400).json({ message: 'Missing required data' });
        }

        const enrichedUrls = urls.map(url => {
            const enrichedInfo = enrichmentData.find(data => data.url === url.redirectUrl) || {};
            return new Url({
                _id: enrichedInfo._id,
                url: url.redirectUrl,
                name: enrichedInfo.name || 'N/A',
                est_emp: enrichedInfo.est_emp || 0,
                industry: enrichedInfo.industry || 'N/A',
                annual_rev: enrichedInfo.annual_rev || -1,
                country: enrichedInfo.country || 'N/A'
            });
        });

        if (enrichedUrls.length === 0) {
            return res.status(404).json({ message: 'No enriched URLs available' });
        }

        await Url.insertMany(enrichedUrls);
        res.status(200).json({ message: 'URLs enriched and saved successfully' });
    } catch (error) {
        console.error('Error saving URLs:', error);
        res.status(500).json({ message: 'An error occurred while saving URLs' });
    }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/urlBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});