import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOrderList,
  statusUpdate,
} from "../_redux/OrderAction";
import { useHistory } from "react-router-dom";

const DeliveredOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [loader, setLoader] = useState("");
  const orderList = useSelector((state) => state.orderInfo.orderList);
  const isOrderList = useSelector((state) => state.orderInfo.isOrderList);
  const isUpdating = useSelector((state) => state.orderInfo.isUpdating);

  useEffect(() => {
    dispatch(GetOrderList("Delivered"));
  }, []);

  return (
    <>
      <div className="row bg-light py-2">
        <div className="col-sm-2">
          <h6>All Delivered Order List</h6>
        </div>
      </div>
      <div className="mt-3">
        {!isOrderList && orderList && orderList.length === 0 && (
          <>
            <div class="alert alert-success text-center mt-5 mt-5" role="alert">
              Sorry ! No order found.
            </div>
          </>
        )}
        {!isOrderList && orderList !== null && orderList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Order Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{item.buyerName}</td>
                  <td>{item.buyerNumber}</td>
                  <td>
                    <a
                      className="btn btn-outline-success"
                      onClick={() => {
                        history.push(`order-details/${item._id}`);
                      }}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DeliveredOrder;
