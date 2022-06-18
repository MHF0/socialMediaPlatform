import React, { useState } from "react";
import "./style.css";
import Modal from "react-modal";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const WelcomeComponent = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalIsOpen2, setmodalIsOpen2] = useState(false);

  return (
    <div>
      <>
        <div className="main1">
          <div className="left1">
            <svg viewBox="0 0 40 24" aria-hidden="true" className="insideImage">
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
          </div>
          <div className="right1">
            <img
              className="logo"
              width="20%"
              src="https://th.bing.com/th/id/R.048de335ff9de3bac56b8dcbdfb561d7?rik=GRbAwDsT9Y2HXA&pid=ImgRaw&r=0"
              alt="logo"
            />
            <h1>Happening now</h1>
            <div className="right-div">
              <h2>Join Twitter Today</h2>
              <button className="btn1" onClick={() => setmodalIsOpen(true)}>
                Sign Up
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setmodalIsOpen(false)}
                className="modal"
                style={{
                  overlay: {
                    color: "black",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                  content: {
                    position: "absolute",
                    top: "10em",
                    left: "30em",
                    right: "3em",
                    bottom: "4em",
                  },
                }}
              >
                <button onClick={() => setmodalIsOpen(false)} className="close">
                  X
                </button>
              </Modal>
              <br />
              <button className="btn22" onClick={() => setmodalIsOpen2(true)}>
                Log In
              </button>
              <Modal
                isOpen={modalIsOpen2}
                onRequestClose={() => setmodalIsOpen2(false)}
                className="modal"
                style={{
                  overlay: {
                  
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                  content: {
                    position: "absolute",
                    top: "10em",
                    left: "30em",
                    right: "3em",
                    bottom: "4em",
                  },
                }}
              >
                <button
                  className="close"
                  onClick={() => setmodalIsOpen2(false)}
                >
                  X
                </button>
              </Modal>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default WelcomeComponent;
