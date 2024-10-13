// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import bigdataimage from "./assets/bigdataimage.jpeg";
import doctorimage from "./assets/pngtree-young-female-doctor-with-patient-file-chart-coat-photo-png-image_13661098.png"
import profileicon from "./assets/profile-svgrepo-com.svg";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <div>
          <div className="nav">
            <div className="nav-title">PHARMAWATCH</div>
          </div>
          <div className="main-body">
            <div className="left-section">
              <div className="left-section-selector">Calendar</div>
              <div className="left-section-selector">Dashboard</div>
              <div className="left-section-checklist-container">paitent list placeholder</div>
              {/* have a map that returns rows of them */}
            </div>
            <div className="right-section">
              <div className="right-top-section">
                <div className="right-top-row">
                  <div className="today-progress-container">
                    <div className="today-progress-chart">progress graph</div>
                    <div className="today-progress-text">TODAY’S PROGRESS</div>
                  </div>
                  <div className="chat-box-container">
                    <img
                      src={doctorimage}
                      alt="doc image"
                      className="doc-image"
                    />
                    <div className="">
                      <div className="doc-name">Dr. Kawasaki</div>
                      <div className="doc-email">kawa.gmail.com</div>
                    </div>
                  </div>
                </div>
                <div className="right-bottom-row">
                  <div className="paitent-name-container">
                    <img src={profileicon} alt="Profile Icon" className="patientProfile-Icon"/>
                    <div className="paitent-discription">PATIENT - ADAM COOPER</div>
                  </div>
                  <div className="paitent-info-container">
                    <div className="paiten-info-row">SEX</div>
                    <div className="paiten-info-row">Blood Group</div>
                    <div className="paiten-info-row">Age</div>
                  </div>
                  <div className="tacking">tracking</div>
                </div>
              </div>
              <div className="info-tiles-section">
                <div className="appointment-history">pill list</div>
                <div className="stacked-tiles">
                  <div className="prescription-history">per his</div>
                  <div className="summery-graph">
                    <div> PROGRESS PAST MONTH: </div>
                    <img
                      src={bigdataimage}
                      alt="big data image"
                      className="big-data-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
