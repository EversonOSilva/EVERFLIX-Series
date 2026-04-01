import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <CircularProgress />
    </div>
  );
}

export default Loading;