import "./ReactPgs.css";
import Chat_Gpt from "../react-pages/chat-gpt.tsx"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ReactPgs() {
  return (
    <div class="rct-page">
      <head></head>
      <body className="rct-header">
        <h1>React Pages</h1>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-projects"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <div>
          <Chat_Gpt />
        </div>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
        <p>This page is a work in progress</p>
      </body>
    </div>
  );
}

export default ReactPgs;
