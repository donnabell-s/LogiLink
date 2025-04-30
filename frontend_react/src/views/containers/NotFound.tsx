import React, { useState } from 'react';

export const NotFound: React.FC = () => {
  const [errorMessage] = useState<string>('Page not found!');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Not Found</h1>
      <p>{errorMessage}</p>
      {/* <a href="/">Go back to Home</a> */}
    </div>
  );
}