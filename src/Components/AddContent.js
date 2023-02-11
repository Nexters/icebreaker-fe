import { Button, TextField, Box } from "@mui/material";
import uuid from "react-uuid";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Chip } from "@mui/material";
import { TagsInput } from "react-tag-input-component";

function AddContent({ addContent }) {
  let [subject, setSubject] = useState([]);
  let [paragraph, setParagraph] = useState("");

  return (
    <>
      <Box m={2} mt={4} mb={3}>
        <Chip label="질문 등록" />
      </Box>
      <Box m={2}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="내용"
          autoComplete="off"
          variant="outlined"
          value={paragraph}
          onChange={(e) => {
            setParagraph(e.target.value);
          }}
        />
      </Box>
      <Box m={2}>
        <TagsInput
          value={subject}
          onChange={(e) => {
            setSubject(e);
          }}
          name="태그"
          placeHolder="태그 입력"
        />
      </Box>
      <Box m={2}>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => {
              addContent({
                id: uuid(),
                paragraph: paragraph,
                subject: subject,
                isUser: false,
                isValid: true,
              });
              setParagraph("");
              setSubject([]);
            }}
          >
            등록
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default AddContent;
