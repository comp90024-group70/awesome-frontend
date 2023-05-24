import { useState, useEffect } from "react";
import "../css/showTextInTime.css";
import { sendRequest } from "./requests";

function ShowTextInTime() {
  const [data, setData] = useState({});
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      sendRequest("/mastodon/recent")
        .then((res) => {
          if (res.status === 200) {
            // Request was successful
            setData(res.data.data);
            console.log(res.status);
          } else {
            // Handle other status codes
            setData({
              username: "Mastodon is done!",
              content: "error",
            });
          }
        })
        .catch((error) => {
          // Handle network or other errors without logging to the console
          setData({
            username: "Error",
            content: "Mastodon is down",
          });
        });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let newUser = data.username;
    let newText = data.content;

    if (newText && newText.length > 100) {
      newText = newText.slice(0, 100) + "...";
    }
    setUserName(newUser);
    setText(newText);
  }, [data]);

  return (
    <>
      <h1
        style={{
          color: "purple",
          textAlign: "center",
          marginTop: "5%",
          fontSize: "18px",
        }}
      >
        Real Time Mastodon Content{" "}
      </h1>
      <div className="containerInTime">
        <div className="textInTime">
          {Object.keys(data).length === 0
            ? "Loading..."
            : `${userName}: ${text}`}
        </div>
      </div>
    </>
  );
}
export default ShowTextInTime;
