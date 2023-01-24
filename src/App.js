import logo from "./logo.svg";
import "./App.css";
import {
  Button,
  TextField,
  Box,
  Container,
  AppBar,
  Toolbar,
  ThemeProvider,
  Typography,
  Card,
} from "@mui/material";
import { Add, InsertEmoticon, MenuIcon } from "@mui/icons-material";
import uuid from "react-uuid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Unstable_Grid2";
import { Divider, Chip } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { palette } from "@mui/system";
import { blue } from "@mui/material/colors";
import { TagsInput } from "react-tag-input-component";

const theme = createTheme({
  palette: {
    primary: {
      main: "#08192b",
    },
  },
});

function App() {
  let [contentList, setContentList] = useState([]);

  function addContent(content) {
    setContentList([content, ...contentList]);
  }

  function removeContent(id) {
    setContentList(contentList.filter((content) => content[0] !== id));
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="md">
        <AddContent addContent={addContent} />
        <Divider sx={{ margin: "5%" }} />
        <ShowContentList
          contentList={contentList}
          removeContent={removeContent}
        />
      </Container>
    </ThemeProvider>
  );
}

function ShowContentList({ contentList, removeContent }) {
  return (
    <>
      <Box m={2}>
        <Chip label="질문 목록" />
      </Box>

      <Box m={1} mb={6} mt={4}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="search"
          label="검색"
          autoComplete="off"
          variant="standard"
        />
      </Box>
      {contentList.map((content) => {
        return (
          <div key={content[0]}>
            <Box
              mt={3}
              pt={1}
              pb={1}
              sx={{ backgroundColor: "#12121211", borderRadius: "10px" }}
            >
              <Box m={2}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="내용"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                  }}
                  value={content[1]}
                />
              </Box>
              <Box m={2}>
                <TagsInput value={content[2]} name="태그" />
              </Box>

              <Grid container justifyContent="flex-end">
                <Box mr={2} mb={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      removeContent(content[0]);
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

function AddContent({ addContent }) {
  let [subject, setSubject] = useState([]);
  let [content, setContent] = useState("");

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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </Box>
      <Box m={2}>
        <TagsInput
          value={subject}
          onChange={(e) => {
            console.log(e);
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
              addContent([uuid(), content, subject]);
              setSubject([]);
              setContent("");
            }}
          >
            등록
          </Button>
        </Grid>
      </Box>
    </>
  );
}

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IceBreaker Fe
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
