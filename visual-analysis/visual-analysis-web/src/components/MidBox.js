import "../css/midBox.css";
import Map from "../utils/Map";
import { sendRequest } from "../utils/requests";
import { useEffect, useState } from "react";

function MidBox() {
  const [twitterCount, setTwitterCount] = useState(0);
  const [mastodonCount, setMastodonCount] = useState(0);
  useEffect(() => {
    sendRequest("/twitter/count").then((res) => {
      setTwitterCount(res.data.data.count);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      sendRequest("/mastodon/count").then((res) => {
        setMastodonCount(res.data.data.count);
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="midBox">
      <div className="number">
        <div className="numberHeader">
          <ul>
            <li style={{ color: "blue" }}>{twitterCount}</li>
            <li style={{ color: "blue" }}>{mastodonCount}</li>
          </ul>
        </div>
        <div className="numberBody">
          <ul>
            <li style={{ color: "purple", fontSize: "18px" }}>Twitters</li>
            <li style={{ color: "purple", fontSize: "18px" }}>Mastodons</li>
          </ul>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default MidBox;
