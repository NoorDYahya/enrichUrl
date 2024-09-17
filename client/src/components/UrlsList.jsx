
import React from 'react';
import UrlItem from './UrlItem';


const UrlsList = ({ enrichedUrls, searchTerm }) => {
  // Filter URLs based on search term
  const filteredUrls = enrichedUrls.filter(url =>
    url.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group URLs by country
  const groupedUrls = filteredUrls.reduce((acc, url) => {
    const country = url.country || 'Unknown';
    if (!acc[country]) acc[country] = [];
    acc[country].push(url);
    return acc;
  }, {});

  // Sort countries alphabetically
  const sortedCountries = Object.keys(groupedUrls).sort();

  return (
    <div className="container mt-5">
      {sortedCountries.length > 0 ? (
        sortedCountries.map(country => (
          <div key={country} className="mb-5">
            <h2 className="text-center mb-4">{country}</h2>
            <div className="row">
              {groupedUrls[country]
                .sort((a, b) => (b.est_emp || 0) - (a.est_emp || 0))
                .map((url, index) => (
                  <UrlItem
                    key={`${url.id}-${index}`} // Ensure unique key
                    urlData={url}
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default UrlsList;
