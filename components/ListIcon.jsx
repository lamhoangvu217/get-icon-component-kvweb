import { useEffect, useState } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
export const ListIcon = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/get-images")
      .then((response) => response.json())
      .then((data) => setImages(data.images));
  }, []);
  return (
    <div>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} gap={4}>
        {images.map((image, index) => (
          <Image
            width="30"
            height="30"
            src={`/outline/${image}`}
            alt={image}
            key={index}
          />
        ))}
      </Box>
    </div>
  );
};
