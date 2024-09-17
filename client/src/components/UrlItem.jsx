import React from 'react';

const UrlItem = ({ urlData }) => {
  const { url = 'Unknown URL', name = 'Unknown', est_emp = 'N/A', annual_rev = 'N/A', country = 'Unknown' } = urlData || {};

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Country: {country}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
          <li className="list-group-item">Estimated Employees: {est_emp}</li>
          <li className="list-group-item">Annual Revenue: {annual_rev === -1 ? 'Not Available' : annual_rev}</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlItem;
