import { Skeleton, Box } from '@mui/material';

const ShimmerCard = () => {
  return (
    <Box
      sx={{
        width: 200, // Match this with your actual card width
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Skeleton variant="rectangular" width={200} height={300} animation="wave" />
      <Skeleton variant="text" width="80%" height={24} animation="wave" sx={{ mt: 1 }} />
      <Skeleton variant="text" width="60%" height={20} animation="wave" />
    </Box>
  );
};

export default ShimmerCard;
