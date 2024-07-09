import "./style.css";
import { creatNewUser } from "../../api/dataMelon";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CreatedUser = () => {
  const [newAccount, setNewAccount] = useState("");
  const [newPassAccount, setNewPassAccount] = useState("");
  const [newAccountRank, setNewAccountRank] = useState("");

  const handleSubmitNewAcc = () => {
    const newUser = {
      id: uuidv4(),
      createdAt: new Date().toLocaleDateString("vi-VN"),
      userName: newAccount,
      password: newPassAccount,
      ranker: newAccountRank,
    };
    creatNewUser(newUser);
    try {
      setNewAccount("");
      setNewPassAccount("");
      setNewAccountRank("");
    } catch {
      console.error("Error");
    }
  };

  return (
    <div className="creat-acc">
      <form className="form-creat">
        <div className="item-creat">
          <label htmlFor="creat-use">username</label>
          <input
            id="creat-use"
            type="text"
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
          />
        </div>
        <div className="item-creat">
          <label htmlFor="creat-pass">password</label>
          <input
            id="creat-pass"
            type="password"
            value={newPassAccount}
            onChange={(e) => setNewPassAccount(e.target.value)}
          />
        </div>
        <div className="item-creat">
          <label htmlFor="creat-rank">Ranker</label>
          <select
            id="creat-rank"
            defaultValue={newAccountRank}
            onChange={(e) => setNewAccountRank(e.target.value)}
            selected
          >
            <option value="" disabled>
              Selected
            </option>
            <option value="member">Member</option>
            <option value="support">Support</option>
          </select>
        </div>
        <div className="btn-submit-creat">
          <button type="button" onClick={handleSubmitNewAcc}>
            CREAT NEW
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatedUser;
