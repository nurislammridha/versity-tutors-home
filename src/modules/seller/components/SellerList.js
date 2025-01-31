import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, SellerDelete, GetSellerList, RemoveShopImg } from "../_redux/SellerAction";
import { useHistory } from "react-router-dom";
const SellerList = () => {
  const history = useHistory();
  const sellerArrList = useSelector(
    (state) => state.sellerInfo.sellerList
  );
  const afterDeleted = useSelector(
    (state) => state.sellerInfo.afterDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSellerList());
  }, []);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetSellerList());
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  const handleDelete = (id, publicId) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this seller?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(RemoveShopImg(id, publicId)),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Seller List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/seller-add")}
        >
          Add Seller
        </a>
      </div>
      <div className="mt-3">
        {sellerArrList != null && sellerArrList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Address</th>
                <th>Shop</th>
                <th>Period</th>
                <th>Ratings</th>
                <th>Phone</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.sellerName}</td>
                  <td>{item.sellerAddress}</td>
                  <td>{item.shopName}</td>
                  <td>{item.deliveryPeriod}</td>
                  <td>{item.sellerRatings}</td>
                  <td>{item.sellerPhone}</td>
                  <td><img src={item?.shopLogo?.url} width={30} /></td>
                  <td>{item.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => history.push({ pathname: `/seller-edit/${item._id}`, state: { data: item } })}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    {item._id !== "6602d7dfdf403e1264fffccc" && <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id, item?.shopLogo?.publicId)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>}
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

export default SellerList;
