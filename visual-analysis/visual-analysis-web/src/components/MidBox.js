import "../css/midBox.css";
import Map from "../utils/Map";
import {sendRequest} from "../utils/requests";
import {useEffect, useState} from "react";

function MidBox() {
    const [twitterCount, setTwitterCount] = useState(0);
    const [mastodonCount, setMastodonCount] = useState(0);
    useEffect(() => {
        sendRequest("/twitter/count").then((res) => {
            setTwitterCount(res.data.data);
        });
    }, [])
    useEffect(() => {
      sendRequest("/mastodon/count").then((res) => {
        setMastodonCount(res.data.data);
      });
    }, [])
    return (
        <div className="midBox">
            <div className="number">
                <div className="numberHeader">
                    <ul>
                        {/*<li>{twitterCount}</li>*/}
                        {/*<li>{mastodonCount}</li>*/}
                        <li>Twitters</li>
                        <li>Mastodons</li>
                    </ul>
                </div>
                <div className="numberBody">
                    <ul>
                        <li>Twitters</li>
                        <li>Mastodons</li>
                    </ul>
                </div>
            </div>
            <Map/>
        </div>
    );
}

export default MidBox;
