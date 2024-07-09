import "./style.css";
import { saveDataMelon } from "../../api/dataMelon";
import { useAutoSelect } from "../../hook/useAutoSelect";

import { useState } from "react";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";

const Melon = ({ dataMelon, setDataMelon, ranker }) => {
  const [textareas, setTextareas] = useState([]);

  const [add, setAdd] = useState(false);
  const [save, setSave] = useState(false);
  const [nameMelon, setNameMelon] = useState("");
  const [priceMelon, setPriceMelon] = useState(0);
  const [resultPrice, setResultPrice] = useState(0);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState(false);
  const [calculatorMelon, setCalculatorMelon] = useState(false);
  const [temporary, setTemporary] = useState(0);

  const [selectName, handleSelectName] = useAutoSelect("");
  const [selectPrice, handleSelectPrice] = useAutoSelect(0);

  const date = new Date();
  const orderCreator = sessionStorage.getItem("user");

  const handleSubmit = () => {
    setTextareas((prev) => [
      ...prev,
      {
        id: uuidv4(),
        value: "",
        name: nameMelon,
        price: priceMelon,
        kilograms: 0,
        totalPriceMelon: 0,
      },
    ]);
    setAdd(false);
    setNameMelon("");
    setPriceMelon(0);
  };

  const handleAdd = () => {
    setAdd(true);
    setTemporary(0);
  };

  const handleChangeNumberOfKilogram = (id, value, price) => {
    const values = value.split(",").reduce((t, c) => +t + +c);
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

  const handleReset = () => {
    setTextareas([]);
    setResultPrice(0);
    setCalculatorMelon(false);
    setTemporary(0);
  };

  const handleCheckedSave = () => {
    if (!ranker) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Bạn không có thẩm quyền để lưu?",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (textareas.length === 0) {
      Swal.fire({
        customClass: {
          title: "title-thongbao",
          icon: "icon-err",
        },
        position: "center",
        title: "BẬY ZÒI NHA! CÓ CÁI GÌ ĐÂU MÀ LƯU",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    } else {
      setSave(true);
    }
  };

  const handleSaveData = () => {
    const newData = {
      id: uuidv4(),
      name: name,
      createdAt: date.toLocaleString("vi-VN"),
      dataMelon: textareas,
      note: note,
      payment: payment,
      orderCreator: orderCreator,
    };

    if (name === "") {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Tên khách hàng đâu ba?",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    } else {
      Swal.fire({
        title: "Bạn có muốn lưu đơn hàng không?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Lưu",
        denyButtonText: `Ko lưu`,
      }).then((result) => {
        if (result.isConfirmed) {
          saveDataMelon(newData);
          setDataMelon([...dataMelon, newData]);
          handleReset();
          setSave(false);
          Swal.fire("Đã lưu!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Không lưu", "", "info");
        }
      });
    }
  };

  const calculatorMelons = () => {
    const rst = textareas.reduce((t, c) => {
      return t + c.totalPriceMelon;
    }, 0);

    setResultPrice(rst);
    setCalculatorMelon(true);
  };

  const handleDeleteItem = (index) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn sẽ không thể hoàn nguyên hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vâng, xóa đi!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = [...textareas];
        updatedItems.splice(index, 1);
        setTextareas(updatedItems);
        Swal.fire({
          title: "Deleted!",
          text: "Loại dưa này đã được xóa!",
          icon: "success",
        });
      }
    });
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
                <button
                  className="btn-save"
                  onClick={handleCheckedSave}
                  type="button"
                >
                  LƯU ĐƠN HÀNG
                </button>
                <button onClick={handleAdd} type="button">
                  THÊM MỚI
                </button>
              </>
            )}
          </div>

          {add ? (
            <div className="box-product box-add-new">
              <div>
                <label htmlFor={nameMelon} className="label-name">
                  LOẠI DƯA
                </label>
                <input
                  ref={selectName}
                  type="text"
                  value={nameMelon}
                  id={nameMelon}
                  className="name-melon"
                  onChange={(e) => setNameMelon(e.target.value)}
                  onFocus={handleSelectName}
                />
              </div>
              <div>
                <label
                  htmlFor={`${nameMelon}${priceMelon}`}
                  className="label-name"
                >
                  GIÁ 1KG
                </label>
                <input
                  type="text"
                  ref={selectPrice}
                  typeof="numeric"
                  defaultValue={priceMelon}
                  id={`${nameMelon}${priceMelon}`}
                  className="price-new-melon"
                  onChange={(e) => setPriceMelon(e.target.value)}
                  onFocus={handleSelectPrice}
                  inputMode="numeric"
                />
              </div>
            </div>
          ) : (
            <div className="container-pro">
              {textareas.map((textarea, index) => (
                <div key={textarea.id} className="container-product">
                  <div className="box-del">
                    <div
                      className="item-box-del"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <button className="btn-item-box-del">
                        <sub>DELETE</sub>
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
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
                        value={textarea.value.replace(/[^0-9.,]/g, "")}
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
                    {/* tạm tính */}
                    <div className="box-product-text">
                      <input
                        value={temporary.toLocaleString("vi-VN")}
                        className="input-temporary"
                        readOnly
                      />
                      <button
                        type="button"
                        className="button-temporary"
                        onClick={() => setTemporary(textarea.totalPriceMelon)}
                      >
                        TẠM TÍNH
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {textareas.length > 0 && (
                <div className="container-resul-total">
                  <div className="crt-button">
                    <button
                      className="btn-c"
                      onClick={handleReset}
                      type="button"
                    >
                      TÍNH MỚI
                    </button>
                    <button onClick={calculatorMelons} type="button">
                      TỔNG TIỀN
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
                                  : (melon?.price * 1000).toLocaleString(
                                      "vi-VN"
                                    )}
                                <sup>vnđ</sup>
                              </td>
                              <td>
                                {melon?.kilograms ?? 0}
                                <sup>Kg</sup>
                              </td>
                              <td>
                                {melon?.totalPriceMelon.toLocaleString(
                                  "vi-VN"
                                ) ?? 0}
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
                            <sup>VĐN</sup>
                          </strong>
                        </h1>
                      </div>{" "}
                    </section>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Melon;
