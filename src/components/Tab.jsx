import React from "react";
import { app } from "@microsoft/teams-js";
import MediaQuery from "react-responsive";
import "./App.css";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {},
      meetingId: "",
      userName: "",
      isInStageView: false, // Flag to track Stage view
    };
  }

  componentDidMount() {
    app.initialize().then(() => {
      app.notifySuccess();

      app.getContext().then(async (context) => {
        this.setState({
          meetingId: context.meeting.id,
          userName: context.user.userPrincipalName,
          isInStageView: context.page.frameContext === "stage", // Check for Stage view
        });
      });
    });
  }

  render() {
    const {  isInStageView } = this.state;

    return (
      <div>
          <div>
            <iframe
              src="https://meetingwebappstorage.z13.web.core.windows.net"
              title="my-iframe"
              frameBorder="0"
              width="100%"
              height="400px"
              allow="camera; microphone"
            />
          </div>
        {/* Text for side panel */}
        <MediaQuery maxWidth={280}>
          <h3>This is the side panel</h3>
          <p>Iframe available in Stage view.</p>
          <p>{isInStageView}</p>
        </MediaQuery>

        {/* Iframe for stage view */}
        {/* {isInStageView && (
        )} */}
      </div>
    );
  }
}

export default Tab;
