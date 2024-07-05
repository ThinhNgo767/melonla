import "./style.css";
import { saveDataMelon } from "../../api/dataMelon";

import { useState } from "react";
import swal from "sweetalert";

const Melon = ({ isLogin }) => {
  const [textareas, setTextareas] = useState([
    {
      id: 1,
      value: "",
      name: "dưa chưng",

      kilograms: 0,
      totalPriceMelon: 0,
    },
  ]);

  const [add, setAdd] = useState(false);
  const [save, setSave] = useState(false);
  const [nameMelon, setNameMelon] = useState("");
  const [resultPrice, setResultPrice] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState(false);
  const [calculatorMelon, setCalculatorMelon] = useState(false);

  const date = new Date();

  const handleSubmit = () => {
    setTextareas((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: "",
        name: nameMelon,
      },
    ]);
    setAdd(false);
    setNameMelon("");
  };
  const handleDeleteTexarea = () => {
    swal({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này sẽ xóa bớt 1 loại dưa!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("XÓA THÀNH CÔNG", {
          icon: "success",
        });
        textareas.pop();
        setTextareas([...textareas]);
      } else {
        swal("BẠN ĐÃ HỦY XÓA");
      }
    });
  };

  const handleAdd = () => {
    setAdd(true);
  };

  const handleChangeNumberOfKilogram = (id, value, price) => {
    const values = value.split(" ").reduce((t, c) => +t + +c);
    const totalPrice = values * price * 1000;

    setTextareas((prev) =>
      prev.map((textarea) => {
        if (textarea.id === id) {
          return {
            ...textarea,
            value,
            kilograms: values,
            totalPriceMelon: totalPrice,
          };
        }
        return textarea;
      })
    );
  };

  const handleChangePrice = (id, value) => {
    setTextareas((prev) =>
      prev.map((textarea) => {
        if (textarea.id === id) {
          return {
            ...textarea,
            price: +value,
          };
        }

        return textarea;
      })
    );
  };

  const handleCalculator = (id) => {
    const result = textareas.find((m) => m.id === id);

    if (result) {
      const kilograms = result.value.split(" ");
      result.kilograms = kilograms;
      const totalMelon = result.kilograms.reduce(
        (total, curr) => +total + +curr
      );
      result.totalMelon = totalMelon;
      result.totalPriceMelon = +result.totalMelon * +result.price;
    }
    setTextareas((prev) =>
      prev.map((textarea) => {
        if (textarea.id === id) {
          return {
            ...textarea,
            ...result,
          };
        }
        return textarea;
      })
    );
  };

  const handleSubmitTotal = () => {
    const rst = textareas.reduce((t, c) => {
      return t + c.totalPriceMelon;
    }, 0);

    setResultPrice(rst * 1000);
  };

  const handleReset = () => {
    setTextareas([
      {
        id: 1,
        value: "",
        name: "dưa chưng",
      },
    ]);
    setResultPrice(0);
    setCalculatorMelon(false);
  };

  const handleSaveData = () => {
    const newData = {
      name: name,
      createdAt: date.toLocaleString("vi-VN"),
      dataMelon: textareas,
      note: note,
      payment: payment,
    };

    saveDataMelon(newData);
    setSave(false);
  };

  const calculatorMelons = () => {
    const rst = textareas.reduce((t, c) => {
      return t + c.totalPriceMelon;
    }, 0);

    setResultPrice(rst);
    setCalculatorMelon(true);
  };

  return (
    <>
      {save ? (
        <div className="save-data">
          <p>
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </p>
          <p>
            <label htmlFor="payment">Thanh toán</label>
            <input
              type="checkbox"
              id="payment"
              checked={payment}
              onChange={() => setPayment(!payment)}
            />
          </p>
          <div id="btn-s">
            <button onClick={() => setSave(false)} className="btn-cancel-data">
              Cancel
            </button>
            <button onClick={handleSaveData} className="btn-save-data">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="container-button">
            {add ? (
              <>
                <button onClick={handleSubmit} type="button">
                  HOÀN THÀNH
                </button>

                <button
                  className="btn-c"
                  onClick={() => setAdd(false)}
                  type="button"
                >
                  HỦY THÊM
                </button>
              </>
            ) : (
              <>
                <button onClick={handleAdd} type="button">
                  THÊM MỚI
                </button>
                <button
                  className="btn-c"
                  onClick={handleDeleteTexarea}
                  type="button"
                >
                  XÓA BỚT
                </button>
              </>
            )}
          </div>

          {add ? (
            <div className="box-product">
              <label htmlFor={nameMelon} className="label-name">
                TÊN HÀNG
              </label>
              <input
                type="text"
                value={nameMelon}
                id={nameMelon}
                className="name-melon"
                onChange={(e) => setNameMelon(e.target.value)}
              />
            </div>
          ) : (
            <div>
              {textareas.map((textarea) => (
                <div key={textarea.id} className="container-product">
                  <div className="box-product">
                    <div className="box-item">
                      <label
                        htmlFor={`name-melon-${textarea.id}`}
                        className="label-name-melon"
                      >
                        {textarea.name.toUpperCase()}
                      </label>
                      <label className="label-price">
                        GIÁ
                        <input
                          type="text"
                          className="price-melon"
                          value={textarea.price ?? 0}
                          inputMode="numeric"
                          onChange={(e) =>
                            handleChangePrice(textarea.id, e.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div className="box-product-text">
                      <label
                        htmlFor={`soluong-melon-${textarea.id}`}
                        className="label-name-melon"
                      >
                        SỐ LƯỢNG
                      </label>
                      <textarea
                        value={textarea.value.replace(/[^0-9" " .]/g, "")}
                        id={`soluong-melon-${textarea.id}`}
                        onChange={(e) =>
                          handleChangeNumberOfKilogram(
                            textarea.id,
                            e.target.value,
                            textarea.price
                          )
                        }
                      />
                    </div>
                  </div>
                  {textarea.totalMelon && (
                    <div className="box-product">
                      <p className="p-total">
                        Tổng {textarea.name} :{" "}
                        <strong className="strong-total">
                          {textareas
                            ? textarea?.totalMelon
                            : (textarea?.totalMelon).toFixed(1)}
                          kg
                        </strong>
                      </p>
                      <p className="p-total">
                        Thành $ :{" "}
                        {textarea?.price === undefined ? (
                          <strong className="strong-total">
                            0<sup>đ</sup>
                          </strong>
                        ) : (
                          <strong className="strong-total">
                            {(
                              +textarea?.totalMelon *
                              +textarea?.price *
                              1000
                            ).toLocaleString("vi-VN")}
                            <sup>đ</sup>
                          </strong>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div className="container-resul-total">
                <div className="crt-button">
                  <button onClick={calculatorMelons} type="button">
                    TỔNG TIỀN
                  </button>
                  <button className="btn-c" onClick={handleReset} type="button">
                    TÍNH MỚI
                  </button>
                  <button
                    className="btn-save"
                    onClick={() => setSave(true)}
                    type="button"
                  >
                    LƯU DT
                  </button>
                </div>

                {calculatorMelon && (
                  <section>
                    {" "}
                    <table className="table-total">
                      <thead>
                        <tr>
                          <th>LOẠI</th>
                          <th>GIÁ $</th>
                          <th>SỐ KG</th>
                          <th>TỔNG $</th>
                        </tr>
                      </thead>
                      <tbody>
                        {textareas.map((melon) => (
                          <tr key={melon.id}>
                            <td>{melon.name.toUpperCase()}</td>
                            <td>
                              {isNaN(
                                (melon?.price * 1000).toLocaleString("vi-VN")
                              )
                                ? 0
                                : (melon?.price * 1000).toLocaleString("vi-VN")}
                              <sup>vnđ</sup>
                            </td>
                            <td>
                              {melon?.kilograms ?? 0}
                              <sup>Kg</sup>
                            </td>
                            <td>
                              {melon?.totalPriceMelon.toLocaleString("vi-VN") ??
                                0}
                              <sup>vnđ</sup>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ width: "100vw" }}>
                      <h1 className="price-label">
                        TỔNG CỘNG :
                        <strong>
                          {resultPrice.toLocaleString("vi-VN")}
                          <sup>vnđ</sup>
                        </strong>
                      </h1>
                    </div>{" "}
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Melon;
