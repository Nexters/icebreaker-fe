import "./App.css";
import { Container, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ContentList from "./Components/ContentList";
import AddContent from "./Components/AddContent";
import Navbar from "./Components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#08192b",
    },
  },
});

function App() {
  let [contentList, setContentList] = useState([]);

  function getTopics() {
    fetch("http://api.talkbbokki.me/topics")
      .then((val) => {
        console.log(val);
        let serverContentList = [];
        let topics = val["_embedded"]["topics"];
        for (let i = 0; i < topics.length; i++) {
          serverContentList.push({
            id: topics[i].id,
            paragraph: topics[i].name,
            subject: [topics[i].category],
            tag: topics[i].tag,
            isUser: false,
            isValid: true,
          });
        }
        setContentList(serverContentList);
        console.log("content list update");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //
  // id: id,
  // paragraph: option.target.value,
  // subject: prevContent.subject,
  // isUser: prevContent.isUser,
  // isValid: prevContent.isValid,

  useEffect(() => {
    getTopics();
  }, []);

  function addContent(content) {
    setContentList([content, ...contentList]);
  }

  function removeContent(id) {
    setContentList(contentList.filter((content) => content.id !== id));
  }

  function updateContent(id, content) {
    let newContentList = contentList.map((el) => (el.id === id ? content : el));
    setContentList(newContentList);
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="md">
        <AddContent addContent={addContent} />
        <Divider sx={{ margin: "5%" }} />
        {ContentList.length > 0 ? (
          <ContentList
            contentList={contentList}
            updateContent={updateContent}
            removeContent={removeContent}
          />
        ) : (
          <></>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
