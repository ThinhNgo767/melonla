import "./style.css";
import { updateDataMelon } from "../../../../api/dataMelon";

import { useState } from "react";

const ShowFullData = ({
  data,
  customer,
  edit,
  total,
  handleBack,
  handleDelete,
  handleEdit,
  ranker,
  setDataMelon,
  setEdit,
  setFullInfo,
}) => {
  const {
    id,
    name,
    createdAt,
    dataMelon = [],
    note,
    payment,
    shipped,
  } = customer;
  const [changeNote, setChangeNote] = useState(note);
  const [changePayment, setChangePayment] = useState(payment);
  const [changeShipped, setChangeShipped] = useState(shipped);

  const handleUpdateOder = (id) => {
    let newOption = {
      note: changeNote,
      payment: changePayment,
      shipped: changeShipped,
    };
    const user = data.map((d, i) => {
      if (d.id === id) {
        d = { ...d, ...newOption };
        data[i] = d;
        updateDataMelon(d.id, d);
      }
      return d;
    });

    setDataMelon(user);
    setEdit(false);
    setFullInfo(false);
  };

  return (
    <div className="box-show-full">
      <button onClick={handleBack}>Quay lại</button>
      <table>
        <thead key={id}>
          <tr>
            <th>Tên Khách Hàng</th>
            <th colSpan="3">{name}</th>
          </tr>
          <tr>
            <th>Ngày đặt hàng</th>
            <th colSpan="3">{createdAt}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td colSpan="4" className="info-order">
              Chi tiết đơn hàng
            </td>
          </tr>
          <tr>
            <th>Loại Dưa</th>
            <th>Số Kg</th>
            <th>Giá 1Kg</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          {dataMelon.map((melon) => (
            <tr key={melon.id}>
              <td className="name-melon">{melon.name}</td>
              <td>
                {melon.kilograms}
                <sup>kg</sup>
              </td>
              <td>
                {melon.price}
                <sup>ngàn</sup>
              </td>
              <td>
                {melon.totalPriceMelon.toLocaleString("vi-VN")}
                <sup>vnđ</sup>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan="4">------</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Tổng tiền đơn hàng</th>
            <td colSpan="3" className="total-price">
              {total.toLocaleString("vi-VN")}
              <sup>VNĐ</sup>
            </td>
          </tr>
          <tr>
            <th>Ghi chú</th>
            <td colSpan="3">
              {edit ? (
                <textarea
                  className="textarea-note"
                  onChange={(e) => setChangeNote(e.target.value)}
                  value={changeNote}
                />
              ) : (
                <span>{changeNote}</span>
              )}
            </td>
          </tr>
          <tr>
            <th rowSpan="2">Tình trạng đơn hàng</th>
            <td colSpan="3" className={payment ? "paid" : "not-paid"}>
              {edit ? (
                <label htmlFor="check-payment" className="check-payment">
                  <input
                    id="check-payment"
                    type="checkbox"
                    checked={changePayment}
                    onChange={() => setChangePayment(!changePayment)}
                  />{" "}
                  {changePayment ? "Đã giao hàng" : "Chưa giao hàng"}
                </label>
              ) : (
                <span> {payment ? "Đã thanh toán" : "Chưa thanh toán"}</span>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="3" className={shipped ? "paid" : "not-paid"}>
              {edit ? (
                <label htmlFor="check-shipped" className="check-shipped">
                  <input
                    id="check-shipped"
                    type="checkbox"
                    checked={changeShipped}
                    onChange={() => setChangeShipped(!changeShipped)}
                  />{" "}
                  {changeShipped ? "Đã giao hàng" : "Chưa giao hàng"}
                </label>
              ) : (
                <span>{shipped ? "Đã giao đơn" : "Chưa giao đơn"}</span>
              )}
            </td>
          </tr>
        </tfoot>
      </table>
      {ranker && (
        <div className="item">
          <button onClick={() => handleDelete(customer.id)}>Delete</button>
          {edit ? (
            <button onClick={() => handleUpdateOder(customer.id)}>
              Submit
            </button>
          ) : (
            <button onClick={() => handleEdit(customer.id)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowFullData;
