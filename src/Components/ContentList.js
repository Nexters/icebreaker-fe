import {
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BlockIcon from "@mui/icons-material/Block";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Unstable_Grid2";
import { Chip } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { TagsInput } from "react-tag-input-component";

function ContentList({ contentList, updateContent, removeContent }) {
  let [changedSet, setChangedSet] = useState(new Set());
  let [isUserContent, setIsUserContent] = useState(false);
  let [isUnValidContent, setIsUnValidContent] = useState(false);

  let handleParagraphChange = (id) => (option) => {
    let prevContent = contentList.find((c) => c.id === id);
    if (prevContent.paragraph === option.target.value) {
      return;
    }
    updateContent(id, {
      id: id,
      paragraph: option.target.value,
      subject: prevContent.subject,
      isUser: prevContent.isUser,
      isValid: prevContent.isValid,
    });
    setChangedSet((changedSet) => new Set(changedSet.add(id)));
  };

  let handleSubjectChange = (id) => (option) => {
    let prevContent = contentList.find((c) => c.id === id);
    if (prevContent.subject === option) {
      return;
    }
    updateContent(id, {
      id: id,
      paragraph: prevContent.paragraph,
      subject: option,
      isUser: prevContent.isUser,
      isValid: prevContent.isValid,
    });
    setChangedSet((changedSet) => new Set(changedSet.add(id)));
  };

  let handleValidChange = (id) => {
    let prevContent = contentList.find((c) => c.id === id);
    updateContent(id, {
      id: id,
      paragraph: prevContent.paragraph,
      subject: prevContent.subject,
      isUser: prevContent.isUser,
      isValid: !prevContent.isValid,
    });
    // setChangedSet((changedSet) => new Set(changedSet.add(id)));
  };

  let handleUserContentCheckbox = (e) => {
    setIsUserContent(e.target.checked);
  };

  let handleUnValidContentCheckbox = (e) => {
    setIsUnValidContent(e.target.checked);
  };
  return (
    <>
      <Box m={2}>
        <Chip label="질문 목록" />
      </Box>

      <Box m={1} mb={1} mt={4}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={Array.from(changedSet)}
          id="search"
          label="검색"
          autoComplete="off"
          variant="standard"
        />
      </Box>
      <Grid container justifyContent="flex-end">
        <Box>
          <FormControlLabel
            control={<Checkbox />}
            label="비활성 질문"
            value={isUnValidContent}
            onChange={handleUnValidContentCheckbox}
          />
          <FormControlLabel
            onChange={handleUserContentCheckbox}
            value={isUserContent}
            control={<Checkbox />}
            label="유저 질문"
          />
        </Box>
      </Grid>
      {contentList
        .filter((content) => (isUserContent ? content.isUser : true))
        .filter((content) => (isUnValidContent ? !content.isValid : true))
        .map((content) => {
          return (
            <div key={content.id}>
              <Box
                mt={3}
                pt={1}
                pb={1}
                sx={{
                  backgroundColor: !content.isValid ? "#11111166" : "#11111111",
                  borderRadius: "10px",
                }}
              >
                <Box ml={2} mb={2} mt={1}>
                  {content.isUser ? (
                    <Chip size="small" label="유저" color="secondary" />
                  ) : (
                    ""
                  )}
                  {!content.isValid ? (
                    <Chip size="small" label="비활성" color="warning" />
                  ) : (
                    ""
                  )}
                </Box>
                <Box m={2}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="내용"
                    variant="outlined"
                    sx={{
                      backgroundColor: "#fff",
                    }}
                    value={content.paragraph}
                    onChange={handleParagraphChange(content.id)}
                  />
                </Box>
                <Box m={2}>
                  <TagsInput
                    value={content.subject}
                    name="태그"
                    onChange={handleSubjectChange(content.id)}
                  />
                </Box>

                <Grid container justifyContent="flex-end">
                  <Box mr={6} mb={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={
                        content.isValid ? <BlockIcon /> : <FlightTakeoffIcon />
                      }
                      onClick={() => {
                        handleValidChange(content.id);
                      }}
                    >
                      {content.isValid ? "비활성화" : "활성화"}
                    </Button>
                  </Box>
                  <Box mr={2} mb={1}>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={
                        Array.from(changedSet).find((l) => l === content.id) ===
                        undefined
                      }
                      startIcon={<SyncAltIcon />}
                      onClick={() => {
                        let newSet = new Set(changedSet);
                        newSet.delete(content.id);
                        setChangedSet(newSet);
                      }}
                    >
                      수정
                    </Button>
                  </Box>
                  <Box mr={2} mb={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        removeContent(content.id);
                      }}
                    >
                      삭제
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </div>
          );
        })}
    </>
  );
}

export default ContentList;
