
// var Url = require('../models/urlModel');


// const fetchUrls = async () => {
//     try{
//         const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/messages.json');
//         if (!response.ok) {
//             throw new Error('No enrichment data found');
//         }
      
//         const data = await response.json();
    

//         return data.map((item) => {
//             const urlString = item._source.message[0].link.url;
//             console.log('URL String:', urlString); 
//             const redirectParam = urlString.split('redirect=')[1];
//             const redirectUrl = redirectParam ? decodeURIComponent(redirectParam.split('&')[0]) : null;
//             return { redirectUrl };

//         }).filter(url => url.redirectUrl);;
//     }
//     catch(error){
//         console.error('Error fetching URLs:', error);
//         throw error;
//     }
// };


// const fetchEnrichmentData = async () => {
//         try{
//             const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/data.json');
//             if (!response.ok) {
//                 throw new Error('No enrichment data found');
//             }
//             const data = await response.json();
//             return data;
//         }
//         catch(error){
//             console.error('Error fetching enrichment data:', error);
//             throw error;
//         }
// };

// const postUrl = async(req,res)=>{

//     try{
//         const urls = await fetchUrls();
        
//         const enrichmentData = await fetchEnrichmentData();

//         const enrichedUrls = urls.map((url) => {
//             const enrichedInfo = enrichmentData.find((data) => data.url === url.redirectUrl) || {};
//             var newEnrichedUrl = new Url({
//                 _id: enrichedInfo._id,                
//                 url: url.redirectUrl,
//                 name: enrichedInfo ? enrichedInfo.name : 'N/A',
//                 est_emp: enrichedInfo ? enrichedInfo.est_emp : 0,  
//                 industry: enrichedInfo ? enrichedInfo.industry : 'N/A',
//                 annual_rev: enrichedInfo ? enrichedInfo.annual_rev : -1,
//                 country: enrichedInfo ? enrichedInfo.country : 'N/A'
//             });
//             return newEnrichedUrl;
//         });
//         if (enrichedUrls.length == 0) {
//         return res.status(404).json({ data: 'No enriched URLs available', code: 404 });
//         }

//         const response = await Url.insertMany(enrichedUrls);
//         return res.status(200).json({ data: 'URLs enriched and saved successfully', code: 200, response });

          
//     }catch(error){
//         console.error('Error fetching or enriching URLs:', error);
//         return res.status(500).json({ data: 'An error occurred during the process', code: 500 });
//     }

// }
// const getUrl = async(req,res)=>{
//     try {
//         const response = await Url.find(); // This will now query the 'urlBased' collection
//         res.json(response);
//         res.status(200).json({ data: 'URLs enriched and saved successfully', code: 200 });
//       } catch (error) {
//         console.error('Error fetching URLs:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
 
//  }

// exports.postUrl = postUrl;
// exports.getUrl = getUrl;


// var Url = require('../models/urlModel');
// const fetch = require('node-fetch');

// const fetchUrls = async () => {
//     try {
//         const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/messages.json');
//         if (!response.ok) {
//             throw new Error('Failed to fetch URLs');
//         }
//         const data = await response.json();
//         return data.map((item) => {
//             const urlString = item._source.message[0].link.url;
//             const redirectParam = urlString.split('redirect=')[1];
//             const redirectUrl = redirectParam ? decodeURIComponent(redirectParam.split('&')[0]) : null;
//             return { redirectUrl };
//         }).filter(url => url.redirectUrl);
//     } catch (error) {
//         console.error('Error fetching URLs:', error);
//         throw error;
//     }
// };

// const fetchEnrichmentData = async () => {
//     try {
//         const response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/data.json');
//         if (!response.ok) {
//             throw new Error('Failed to fetch enrichment data');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching enrichment data:', error);
//         throw error;
//     }
// };

// const postUrl = async (req, res) => {
//     try {
//         const urls = await fetchUrls();
//         const enrichmentData = await fetchEnrichmentData();

//         const enrichedUrls = urls.map((url) => {
//             const enrichedInfo = enrichmentData.find((data) => data.url === url.redirectUrl) || {};
//             return new Url({
//                 _id: enrichedInfo._id || url.redirectUrl, // Fallback to URL if _id is missing
//                 url: url.redirectUrl,
//                 name: enrichedInfo.name || 'N/A',
//                 est_emp: enrichedInfo.est_emp || 0,
//                 industry: enrichedInfo.industry || 'N/A',
//                 annual_rev: enrichedInfo.annual_rev || -1,
//                 country: enrichedInfo.country || 'N/A'
//             });
//         });

//         if (enrichedUrls.length === 0) {
//             return res.status(404).json({ data: 'No enriched URLs available', code: 404 });
//         }

//         await Url.insertMany(enrichedUrls);
//         return res.status(200).json({ data: 'URLs enriched and saved successfully', code: 200 });

//     } catch (error) {
//         console.error('Error fetching or enriching URLs:', error);
//         return res.status(500).json({ data: 'An error occurred during the process', code: 500 });
//     }
// };

// const getUrl = async (req, res) => {
//     try {
//         const urls = await Url.find(); // Query MongoDB for URLs
//         return res.status(200).json({ data: urls, code: 200 });
//     } catch (error) {
//         console.error('Error fetching URLs:', error);
//         return res.status(500).json({ data: 'Internal Server Error', code: 500 });
//     }
// };

// exports.postUrl = postUrl;
// exports.getUrl = getUrl;
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