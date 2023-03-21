import { useState } from "react";
import { Box, Button, Input, Text, Select, useToast } from "@chakra-ui/react";
import { CopyBlock, dracula } from "react-code-blocks";
import axios from "axios";
export const RenderIcon = () => {
  const [iconValue, setIconValue] = useState("");
  const [typeValue, setTypeValue] = useState("outline");
  const [svgContent, setSvgContent] = useState("");
  const [isDisplayCodeBlock, setIsDisplayCodeBlock] = useState(false);
  const toast = useToast();
  const handleIconValueChange = (event) => {
    setIconValue(event.target.value);
  };
  const handleTypeValueChange = (event) => {
    setTypeValue(event.target.value);
  };

  function convertNameFile(string) {
    const result = string.replace(/-(.)/g, (match, group1) =>
      group1.toUpperCase()
    );
    const finalResult = result.slice(2);
    return finalResult + "Icon";
  }
  const handleRenderIcon = async () => {
    const iconFileName = iconValue.slice(2).replace(`-${typeValue}-`, "");
    const filePath = `/${typeValue}/${iconFileName}.svg`;
    await axios
      .get(filePath)
      .then(function (response) {
        // handle success
        const newFilePath = response.data.replace(
          "<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->",
          ""
        );

        const originFilePath = newFilePath.replace(
          "<svg",
          `<svg
            fill={color}
            width={size}
            height={size}
            `
        );
        const data = `
          function ${convertNameFile(iconValue)}({
            color = colorDefault,
            size = sizeDefault,
          }: IIconProps) {
            return (
              ${originFilePath}
            )
          }`;
        setSvgContent(data);
        setIsDisplayCodeBlock(true);
      })
      .catch(function (error) {
        // handle error
        toast({
          title: "Render lỗi",
          position: "top-right",
          description: "Vui lòng kiểm tra xem icon đã tồn tại hay chưa",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div>
      <Text>Nhập tên icon lấy từ figma. Ví dụ: 20-outline-arrow-right</Text>
      <Input placeholder="Tên icon" mt={4} onChange={handleIconValueChange} />
      <Select mt={4} onChange={handleTypeValueChange} value={typeValue}>
        <option value="outline">
          Outline
        </option>
        <option value="solid">Solid</option>
      </Select>
      <Button mt={4} onClick={handleRenderIcon}>
        Render
      </Button>
      {isDisplayCodeBlock && (
        <Box mt={4}>
          <CopyBlock
            text={svgContent}
            language={"javascript"}
            showLineNumbers={true}
            startingLineNumber={1}
            theme={dracula}
            wrapLines
          />
        </Box>
      )}
    </div>
  );
};
