import "./style.css";
import { fetchDataMelon, deleteDataMelon } from "../../api/dataMelon";

import { useState, useEffect } from "react";

const DataList = ({ data, setDataMelon }) => {
  const [fullInfo, setFullInfo] = useState(false);
  const [customer, setCustomer] = useState({
    id: null,
    name: "",
    createdAt: null,
    dataMelon: [],
    note: "",
    payment: null,
  });
  const [total, setTotal] = useState(0);
  const [edit, setEdit] = useState(false);
  const [changePay, setChangePay] = useState(false);
  const [changeNote, setChangeNote] = useState("");

  useEffect(() => {
    fetchDataMelon();
    setDataMelon(JSON.parse(sessionStorage.getItem("dataMelon")));
  }, [setDataMelon]);

  const handleShow = (id) => {
    setFullInfo(true);
    const cus = data.find((c) => c.id === id);
    if (cus) {
      setCustomer({
        id: cus.id,
        name: cus.name,
        createdAt: cus.createdAt,
        dataMelon: cus.dataMelon,
        note: cus.note,
        payment: cus.payment,
      });
      const totalPrice = cus.dataMelon
        .map((t) => t.totalPriceMelon)
        .reduce((t, c) => t + c);
      setTotal(totalPrice);
    }
  };

  const handleDelete = (id) => {
    const is = data.find((d) => d.id === id);
    if (is) {
      deleteDataMelon(id);
      data.splice(data.indexOf(is), 1);
    }

    setFullInfo(false);
  };

  const handleEdit = (id) => {
    const cus = data.find((c) => c.id === id);
    if (cus) {
      setChangePay(cus.payment);
    }
    setEdit(!edit);
  };
  return (
    <div className="table-list">
      {fullInfo ? (
        <div className="full-info">
          <button onClick={() => setFullInfo(false)}>Quay lại</button>
          <div className="item-info">
            <div className="item">
              <p>Tên:</p>
              <strong>{customer.name}</strong>
            </div>

            <div className="item">
              <p>Ngày đặt :</p>
              <strong>{customer.createdAt}</strong>
            </div>

            <div className="box-list-melon">
              <p className="sl">Số lượng :</p>

              <div>
                {customer.dataMelon.map((m) => (
                  <div key={m.id} className="list-melon">
                    <ul>
                      <li>
                        Loại dưa : <span>{m.name}</span>
                      </li>
                      <li>
                        Số kg : <span>{m.totalMelon}kg</span>
                      </li>
                      <li>
                        Giá tiền 1kg :{" "}
                        <span>{(m.price * 1000).toLocaleString("vi-VN")}</span>
                        <sup>vnđ</sup>
                      </li>
                      <li>
                        Tổng tiền :
                        <span>
                          {" "}
                          {(m.totalPriceMelon * 1000).toLocaleString("vi-VN")}
                        </span>
                        <sup>vnđ</sup>
                      </li>
                    </ul>
                  </div>
                ))}
                <p className="p-total">
                  Tổng tiền {(total * 1000).toLocaleString("vi-VN")}
                  <sup>vnđ</sup>
                </p>
              </div>
            </div>
            <div className="item box-edit">
              <fieldset>
                <legend>Ghi chú:</legend>
                {edit ? (
                  <textarea
                    value={customer.note}
                    onChange={(e) => setChangeNote(e.target.value)}
                  ></textarea>
                ) : (
                  <span>{customer.note}</span>
                )}
              </fieldset>
            </div>

            <div className="item">
              <p>Thanh toán :</p>
              {edit ? (
                <input
                  type="checkbox"
                  checked={changePay}
                  onChange={() => setChangePay(!changePay)}
                />
              ) : (
                <strong>
                  {customer.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                </strong>
              )}
            </div>
            <div className="item">
              <button onClick={() => handleDelete(customer.id)}>Delete</button>
              {edit ? (
                <button onClick={() => handleEdit(customer.id)}>Submit</button>
              ) : (
                <button onClick={() => handleEdit(customer.id)}>Edit</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày đặt</th>
              <th>Thanh toán</th>
              <th>Xem</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td className="td-name">{d.name}</td>
                <td>{d.createdAt}</td>
                <td>{d.payment ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                <td>
                  <button onClick={() => handleShow(d.id)}>Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataList;
