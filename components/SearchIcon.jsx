import { Box, Input, Text, Textarea } from "@chakra-ui/react";

export const SearchIcon = () => {
  return (
    <Box>
      <Text>Nhập tên icon cần tìm. Ví dụ: 20-outline-arrow-right</Text>
      <Textarea placeholder="Tên icon" my={4} />
    </Box>
  );
};
