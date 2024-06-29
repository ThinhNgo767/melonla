import "./style.css";

import { useState } from "react";
import swal from "sweetalert";

const Melon = () => {
  const [textareas, setTextareas] = useState([
    {
      id: 1,
      value: "",
      name: "dưa chưng",
    },
  ]);
  const [add, setAdd] = useState(false);
  const [nameMelon, setNameMelon] = useState("");

  const [resultPrice, setResultPrice] = useState(0);

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

  const handleChange = (id, value) => {
    setTextareas((prev) =>
      prev.map((textarea) => {
        if (textarea.id === id) {
          return {
            ...textarea,
            value,
          };
        }
        return textarea;
      })
    );
  };

  const handleChangeInput = (id, value) => {
    setTextareas((prev) =>
      prev.map((textarea) => {
        if (textarea.id === id) {
          return {
            ...textarea,
            price: value.replace(/[^0-9]/g, ""),
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
  };

  return (
    <>
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
                {" "}
                <label htmlFor={textarea.id}>
                  {textarea.name.toUpperCase()}
                </label>
                <div className="box-product-text">
                  <textarea
                    value={textarea.value.replace(/[^0-9" " .]/g, "")}
                    id={textarea.id}
                    onChange={(e) => handleChange(textarea.id, e.target.value)}
                  />
                  <div className="box-item">
                    <label className="label-price">
                      GIÁ{" "}
                      <input
                        type="text"
                        className="price-melon"
                        value={textarea?.price ?? ""}
                        inputMode="numeric"
                        onChange={(e) =>
                          handleChangeInput(textarea.id, e.target.value)
                        }
                      />
                    </label>
                    <button
                      onClick={() => handleCalculator(textarea.id)}
                      type="button"
                      className="tinh"
                    >
                      Tính
                    </button>
                  </div>
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
              <button onClick={handleSubmitTotal} type="button">
                TỔNG TIỀN
              </button>
              <button className="btn-c" onClick={handleReset} type="button">
                TÍNH MỚI
              </button>
            </div>
            <div className="crt-kq"></div>
            {resultPrice > 0 && (
              <h2 className="rsprice">
                TỔNG CỘNG :{" "}
                <strong>
                  {resultPrice.toLocaleString("vi-VN")}
                  <sup>vnđ</sup>
                </strong>
              </h2>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Melon;
