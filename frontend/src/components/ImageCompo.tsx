import { Box, BoxProps } from '@mui/material'
import DefaultProfile from "@assets/images/default_profile.png"
import { useEffect, useState } from 'react'

type PropTypes = {
    base64String: string | null
} & BoxProps

const ImageCompo = ({base64String, ...rest}: PropTypes) => {
    const [imageHeader, setImageHeader] = useState<string | null>(null);
    const [imageSizes, setImageSizes] = useState<{width: string, height: string}>({width: "100%", height: "auto"})

    useEffect(() => {
        if (!base64String) return;
        if (base64String.startsWith("/")) setImageHeader("data:base64String/jpeg;base64,");
        if (base64String.startsWith("i")) setImageHeader("data:base64String/png;base64,");
        getBase64ImageSize(base64String);
      }, [base64String]);
    
      const getBase64ImageSize = (base64String: string) => {
        return new Promise((_, reject) => {
          const img = new Image();
          img.onload = () => {
            if (img.width > img.height)
              setImageSizes({ width: "auto", height: "100%" });
            else setImageSizes({ width: "100%", height: "auto" });
          };
          img.onerror = reject;
          img.src = base64String;
        });
      };

  return (
    <Box width="100px" height="100px" borderRadius="50%"  overflow="hidden" {...rest}>
      <img
            src={imageHeader ? imageHeader + base64String : DefaultProfile}
            width={imageSizes.width}
            height={imageSizes.height}
          />
    </Box>
  )
}

export default ImageCompo
