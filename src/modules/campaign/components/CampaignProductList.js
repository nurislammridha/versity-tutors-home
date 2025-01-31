import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { AfterDeletedFalse, CampaignDelete, CampaignProductDelete, GetCampaignDetails, GetCampaignList } from "../_redux/CampaignAction";
import { useHistory, useParams } from "react-router-dom";
const CampaignProductList = () => {
  const history = useHistory();
  const { id } = useParams()
  const campaignDetails = useSelector(
    (state) => state.campaignInfo.campaignDetails
  );
  const { campaignName, products } = campaignDetails || {}
  const afterDeleted = useSelector(
    (state) => state.campaignInfo.afterDeleted
  );
  const dispatch = useDispatch();
  const handleEdit = (data) => {
    history.push({ pathname: `/campaign-edit`, state: { data } })
  }

  const handleDelete = (proId) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this campaign?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(CampaignProductDelete(proId)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(GetCampaignDetails(id));
  }, [id]);
  useEffect(() => {
    if (afterDeleted) {
      dispatch(GetCampaignDetails(id));
      dispatch(AfterDeletedFalse());
    }

  }, [afterDeleted]);
  // console.log('campaignDetails', campaignDetails)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>{campaignName}'s Products</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push(`/campaign-product-add/${id}`)}
        >
          Add Product
        </a>
      </div>
      <div className="mt-3">
        {campaignDetails != null && products.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Campaign</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.sellerName}</td>
                  <td>{item.regularDiscount}</td>
                  <td>{item.campaignDiscount}</td>
                  <td>
                    {/* <a
                      className="btn btn-success btn-sm mr-1"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="fa fa-pencil"></i>
                    </a> */}
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="fa fa-trash"></i>
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

export default CampaignProductList;
