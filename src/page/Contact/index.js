import "./style.css";
import { URL_API_USERS } from "../../api/dataMelon";

import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [test, setTest] = useState(false);
  const [request, setRequest] = useState("Cấp tài khoản mới");

  const handleEmailChange = (e) => {
    setTest(false);
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requests = {
      id: uuidv4(),
      mail: email,
      request: request,
      username: username,
      message: message,
    };

    await axios.get(`${URL_API_USERS}1`).then((res) => {
      const users = res.data;
      users.requests.push(requests);

      axios
        .put(`${URL_API_USERS}1`, users)
        .then(() => {
          setEmail("");
          setMessage("");
          setRequest("Cấp tài khoản mới");
          setUsername("");
          setTest(true);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const handleRequest = (e) => {
    setRequest(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="send-contact">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <label htmlFor="request">Yêu cầu:</label>
      <select onChange={handleRequest} value={request} id="request">
        <option>Cấp tài khoản mới</option>
        <option>Cấp lại password</option>
      </select>
      {request === "Cấp lại password" && (
        <>
          <label>UserName</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </>
      )}

      <label htmlFor="message">Lời nhắn:</label>
      <textarea
        id="message"
        value={message}
        onChange={handleMessageChange}
        required
      ></textarea>

      <button type="submit">Gửi Yêu Cầu</button>
      {test && <p className="rq-text">Gửi yêu cầu thành công</p>}
    </form>
  );
};

export default EmailForm;
