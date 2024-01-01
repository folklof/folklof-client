import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { ImageProps } from "../../types";

const LoadingImages: React.FC<ImageProps> = ({ imgUrl, styleName, alt }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imgUrl;
    image.onload = () => setLoading(false);
  }, [imgUrl]);

  return (
    <>
      {loading ? (
        <Skeleton
          className={styleName}
          variant="rounded"
          sx={{ bgcolor: "#15202B" }}
        />
      ) : (
        <img className={styleName} src={imgUrl} alt={alt} />
      )}
    </>
  );
};

export default LoadingImages;