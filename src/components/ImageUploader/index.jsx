import { Box, Button, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";

function ImageUploader({ selectedFiles, setSelectedFiles, name, onBlur }) {
  // Function to handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // Function to handle image deletion
  const handleDelete = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };
  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        id="fileInput"
        multiple
        name={name}
        onBlur={onBlur}
      />
      <label htmlFor="fileInput">
        <Button as="span" colorScheme="teal">
          Upload Image
        </Button>
      </label>
      <Stack mt={4} spacing={4} direction={"row"} wrap={"wrap"}>
        {selectedFiles?.map((file, index) => (
          <Box key={index}>
            <Image
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index}`}
              width={200}
              height={200}
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                width: "auto",
                height: "auto",
                borderRadius: "15px",
              }}
            />
            <IconButton
              icon={<FiTrash />}
              aria-label="Delete"
              colorScheme="red"
              onClick={() => handleDelete(index)}
              mt={2}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default ImageUploader;
