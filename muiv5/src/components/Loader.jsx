import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ left }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: 4999,
        left: left === 0 ? left : "350px",
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;