import { Box, Button, IconButton, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import { MdUpload } from "react-icons/md";

function ImageUploader({
  name,
  onBlur,
  handleChange,
  values,
  setFieldValue,
}) {
  // Function to handle file selection
  const handleFileSelect = (e) => {
    handleChange("images");
    const files = Array.from(e.target.files);
    setFieldValue("images", [...values.images, ...files]);
  };

  // Function to handle image deletion
  const handleDelete = (index) => {
    const newFiles = [...values.images];
    newFiles.splice(index, 1);
    setFieldValue("images", newFiles);
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
        <Button as="span" colorScheme="teal" leftIcon={<MdUpload />}>
          Upload Image
        </Button>
      </label>
      <Stack mt={4} spacing={4} direction={"row"} wrap={"wrap"}>
        {values?.images?.map((file, index) => (
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
