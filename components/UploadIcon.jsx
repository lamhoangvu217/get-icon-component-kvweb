import { Input, Button, Image, Select, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";

export const UploadIcon = () => {
  const [typeValue, setTypeValue] = useState("outline");
  const [imageSrc, setImageSrc] = useState(null);
  const [fileSvg, setFileSvg] = useState(null);
  const inputFileRef = useRef(null);
  const toast = useToast();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };

    reader.readAsDataURL(file);
    setFileSvg(file);
  };
  const handleTypeValueChange = (event) => {
    setTypeValue(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = await response.json();

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
      toast({
        title: "Upload thành công",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Do some stuff on error
      toast({
        title: "Upload không thành công",
        position: "top-right",
        description: "Vui lòng kiểm tra lại",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Select mt={4} mb={4} onChange={handleTypeValueChange} value={typeValue}>
        <option value="outline">Outline</option>
        <option value="solid">Solid</option>
        <option value="other">Other</option>
      </Select>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          mb={4}
          ref={inputFileRef}
          onChange={handleFileChange}
          accept="image/svg"
        />
        <Button type="submit">Upload</Button>
      </form>

      <Image boxSize="200px" alt="" src={imageSrc} mt={4} />
    </>
  );
};
