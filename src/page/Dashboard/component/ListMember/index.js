import "./style.css";
import { URL_API_USERS } from "../../../../api/dataMelon";
import { updatePassword } from "../../../../api/dataMelon";

import { useEffect, useState } from "react";
import axios from "axios";

const ListMember = () => {
  const [datas, setDatas] = useState(null);
  const [reset, setReset] = useState(false);
  const [id, setId] = useState("");
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    axios
      .get(URL_API_USERS)
      .then((res) => {
        const render = res.data.map((data) => {
          return (
            <tr key={data.id}>
              <td>{data.userName}</td>
              <td>{data.ranker}</td>
              <td>{data.createdAt}</td>
              <td>
                <button
                  onClick={() => handleResetPass(data.id)}
                  className="reset-pass"
                >
                  Reset
                </button>
              </td>
            </tr>
          );
        });
        setDatas(render);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  function handleResetPass(id) {
    setId(id);
    setReset(true);
  }
  async function handleUpdatePass() {
    if (newPass === "") {
      return;
    } else {
      await axios
        .get(URL_API_USERS)
        .then((res) => {
          const isMem = res.data.find((m) => m.id === id);

          const newPassword = {
            password: newPass,
          };
          const newIsMem = { ...isMem, ...newPassword };
          updatePassword(id, newIsMem);
          setReset(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <section className="ListMember">
      {reset && (
        <div>
          <input
            type="password"
            onChange={(e) => setNewPass(e.target.value)}
            className="input-change"
          />
          <div className="box-btn-pass">
            <button onClick={() => setReset(false)} className="cancel-pass">
              Cancel
            </button>
            <button onClick={handleUpdatePass} className="submit-pass">
              Submit
            </button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Ranker</th>
            <th>CreatedAt</th>
            <th>Rs Pass</th>
          </tr>
        </thead>
        <tbody>{datas}</tbody>
      </table>
    </section>
  );
};

export default ListMember;
