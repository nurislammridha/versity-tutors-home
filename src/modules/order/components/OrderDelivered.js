import React, { forwardRef, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOrderList,
  statusUpdate,
} from "../_redux/OrderAction";
import { useHistory } from "react-router-dom";

const OrderDelivered = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [loader, setLoader] = useState("");
  const orderList = useSelector((state) => state.orderInfo.orderList);
  const isOrderList = useSelector((state) => state.orderInfo.isOrderList);
  const isUpdating = useSelector((state) => state.orderInfo.isUpdating);

  useEffect(() => {
    dispatch(GetOrderList("Shipped"));
  }, []);
  const handleUpdate = (id, isCancel) => {
    const date = new Date()
    setLoader(id);
    let data = {}
    if (isCancel) {
      data = {
        isCancel: true,
        orderStatus: "Cancelled",
        cancelAt: date
      };
    } else {
      data = {
        isDelivered: true,
        orderStatus: "Delivered",
        deliveredAt: date
      };
    }

    dispatch(statusUpdate(data, id, "Shipped"));
  };
  return (
    <>
      <div className="row bg-light py-2">
        <div className="col-sm-2">
          <h6>Picked Orders</h6>
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
                <th>Delivered</th>
                <th>Cancel</th>
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
                  <td>
                    {isUpdating && item._id === loader ? (
                      <a className="btn btn-success btn-sm text-light">
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </a>
                    ) : (
                      <a
                        className="btn btn-success btn-sm text-light"
                        onClick={() => handleUpdate(item._id, false)}
                      >
                        DELIVERED
                      </a>
                    )}
                  </td>
                  <td>
                    {isUpdating && item._id === loader ? (
                      <a className="btn btn-success btn-sm text-light">
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </a>
                    ) : (
                      <a
                        className="btn btn-danger btn-sm text-light"
                        onClick={() => handleUpdate(item._id, true)}
                      >
                        CANCEL
                      </a>
                    )}
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

export default OrderDelivered;
