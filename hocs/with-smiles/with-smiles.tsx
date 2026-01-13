import React, { useState } from 'react';

const withSmiles = (Component) => (props) => {
  const [isSmileOpen, changeFlagSmileOpen] = useState(false);
  const handleSmileWindowToggle = () => (
    isSmileOpen ? changeFlagSmileOpen(false) : changeFlagSmileOpen(true)
  );

  return (
    <Component
      {...props}
      isSmileOpen={isSmileOpen}
      handleSmileWindowToggle={handleSmileWindowToggle}
    />
  );
};

export default withSmiles;
