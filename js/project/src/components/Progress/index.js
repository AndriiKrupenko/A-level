import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ mt: '2rem', textAlign: 'center' }}>
      <CircularProgress size={100} />
    </Box>
  );
}
