import {
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

enum ContentType {
  Image,
  Text,
}

const ContentGenerator = () => {
  const [contentType, setContentType] = useState(ContentType.Text);

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <p className="text-4xl font-bold">Content Generator</p>
      <div className="flex flex-row gap-16 w-full h-full">
        <div className="flex flex-col gap-4 w-3/6">
          <div className="flex flex-col gap-2">
            <p className="">Content Type</p>
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              className="w-fit border-none"
            >
              <Button
                color={contentType === ContentType.Text ? "error" : "inherit"}
                onClick={() => setContentType(ContentType.Text)}
                sx={{
                  border: "0 !important",
                }}
              >
                Text
              </Button>
              <Button
                color={contentType === ContentType.Image ? "error" : "inherit"}
                onClick={() => setContentType(ContentType.Image)}
                sx={{
                  border: "0 !important",
                }}
              >
                Image
              </Button>
            </ButtonGroup>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="">Select Campaign</div>
            <Select className="w-full">
              <MenuItem>World Health Day Campaign</MenuItem>
            </Select>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="">Content Description</div>
            <TextField
              multiline
              placeholder="Provide more information about this campaign"
              minRows={4}
              name="prompt"
              // value={formData.prompt}
            ></TextField>
          </div>
          <button
            className="rounded-md px-4 py-2 text-white bg-prudential-red"
            type="submit"
            // onClick={handleSave}
            // disabled={isLoadingSave}
          >
            Generate Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
