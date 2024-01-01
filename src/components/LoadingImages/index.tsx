import { useEffect, useState } from "react";
import { Skeleton} from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "../../containers/HeroSection/HeroSection.module.scss"

interface ImageProps {
    imgUrl : string;
    styleName: string;
}


const LoadingImages: React.FC <ImageProps> = ({imgUrl, styleName})=> {
    const [ loading, setLoading ] = useState(true)

    useEffect(()=> {
      const image = new Image()
      image.src= imgUrl
      image.onload= ()=> setLoading(false)
  }, [imgUrl])

    return (
        <>
            {loading ? (
            <Skeleton
                className={styles[styleName]}
                variant="rounded"
                sx={{bgcolor: '#15202B'}}
            />
            ) : (
            <img
                className={styles[styleName]}
                src= {imgUrl}
                alt="Hero Image"
            />
            )}
        </>
    )
}

export default LoadingImages