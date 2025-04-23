// src/hooks/useSpinner.tsx
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const useSpinner = () => {
  const [loading, setLoading] = useState(false);

  const showSpinner = () => setLoading(true);
  const hideSpinner = () => setLoading(false);

  const Loader = () =>
    loading ? (
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <CircularProgress />
      </Box>
    ) : null;

  return {
    loading,
    showSpinner,
    hideSpinner,
    Loader,
  };
};
