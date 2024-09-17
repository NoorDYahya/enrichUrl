// App.js
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import UrlsList from './components/UrlsList';

const URLS_API = 'https://cdn.taboola.com/mobile-config/home-assignment/messages.json';
const ENRICH_API = 'https://cdn.taboola.com/mobile-config/home-assignment/data.json';

const App = () => {
  const [enrichedUrls, setEnrichedUrls] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const [urlsResponse, enrichResponse] = await Promise.all([
          fetch(URLS_API),
          fetch(ENRICH_API)
        ]);
        const urls = await urlsResponse.json();
        const enrichData = await enrichResponse.json();

        const extractedUrls = urls.map(item => {
          try {
            const link = item._source?.message?.[0]?.link?.url;
            if (!link) {
              console.warn(`Missing link URL for item ID: ${item.id}`);
              return null;
            }

            const urlString = new URL(link);
            const redirectUrl = decodeURIComponent(urlString.searchParams.get('redirect'));

            if (redirectUrl) {
              return { id: item.id, url: redirectUrl };
            } else {
              console.warn(`Missing redirect parameter in URL: ${link}`);
              return null;
            }
          } catch (err) {
            console.error(`Error processing URL: ${item._source?.message?.[0]?.link?.url}`, err);
            return null;
          }
        }).filter(url => url !== null);

        const enrichedList = extractedUrls.map(url => {
          const enrich = enrichData.find(en => en.url === url.url);

          return enrich
            ? {
                _id: enrich._id,
                url: url.url,
                name: enrich.name,
                est_emp: enrich.est_emp,
                annual_rev: enrich.annual_rev,
                country: enrich.country
              }
            : {
                _id: 'N/A',
                url: url.url,
                name: 'Unknown',
                est_emp: 'N/A',
                annual_rev: 'N/A',
                country: 'Unknown'
              };
        });

        setEnrichedUrls(enrichedList);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchUrls();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div style={{ marginTop: '200px'}}> {/* Adjust margin to avoid overlap with the fixed navbar */}
        <UrlsList enrichedUrls={enrichedUrls} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;
