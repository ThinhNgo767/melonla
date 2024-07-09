import "./style.css";
import { deleteDataMelon, fetchDataMelon } from "../../api/dataMelon";
import ShowFullData from "./component/ShowFullData";

import { useState, useEffect } from "react";

const DataListMelon = ({ data = [], setDataMelon, ranker }) => {
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

  const { admin } = ranker;

  useEffect(() => {
    fetchDataMelon();
    try {
      setDataMelon(JSON.parse(sessionStorage.getItem("dataMelon")));
    } catch (err) {
      console.error(err);
    }
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
        shipped: cus.shipped,
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

  const handleEdit = () => {
    setEdit(true);
  };

  // const handleSubmitEdit = (id) => {
  //   let newOption = {
  //     note: changeNote,
  //     payment: changePay,
  //   };
  //   const user = data.map((d, i) => {
  //     if (d.id === id) {
  //       d = { ...d, ...newOption };
  //       data[i] = d;
  //       updateDataMelon(d.id, d);
  //     }
  //     return d;
  //   });

  //   setDataMelon(user);
  //   setEdit(false);
  //   setFullInfo(false);
  // };

  const handleBack = () => {
    setFullInfo(false);
    setEdit(false);
  };

  return (
    <div className="table-list">
      {fullInfo ? (
        <ShowFullData
          data={data}
          customer={customer}
          edit={edit}
          total={total}
          handleBack={handleBack}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          ranker={admin}
          setDataMelon={setDataMelon}
          setEdit={setEdit}
          setFullInfo={setFullInfo}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Người tạo đơn</th>
              <th>Ngày tạo đơn</th>
              <th>Kiểm tra</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td className="td-name">{d.name}</td>
                <td className="creator">{d.orderCreator}</td>
                <td>{d.createdAt}</td>
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

export default DataListMelon;
