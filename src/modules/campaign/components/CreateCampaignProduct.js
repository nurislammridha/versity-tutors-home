import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Select from 'react-select'
import { AfterAddedFalse, AfterDeletedFalse, CampaignDelete, GetCampaignDetails, GetCampaignList, SubmitCampaignProducts, showWithoutAdded } from "../_redux/CampaignAction";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { GetProductBySubCategoryId, getCategoryOption, getSellerOption, getSubCategoryOption } from "src/modules/product/_redux/ProductAction";
import { GetCategoryList } from "src/modules/category/_redux/CategoryAction";
import { GetSellerList } from "src/modules/seller/_redux/SellerAction";
import { SubCategoryByCategoryId } from "src/modules/subCategory/_redux/SubCategoryAction";
const CreateCampaignProduct = () => {
  const location = useLocation()
  const [proInfo, setProInfo] = useState([])//campaignProducts
  //{product:id,productId:id,campaignPrice:234}
  const [discounts, setDiscounts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [subCategoryId, setSubCategoryId] = useState("")
  const [seller, setSeller] = useState("")
  const [sellerId, setSellerId] = useState("")
  const history = useHistory();
  const { id } = useParams()

  const campaignDetails = useSelector(
    (state) => state.campaignInfo.campaignDetails
  );
  const { campaignName, campaignProducts } = campaignDetails || {}

  const categoryArrList = useSelector(
    (state) => state.categoryInfo.categoryList
  );
  const subCategoryArrList = useSelector(
    (state) => state.subCategoryInfo.subCategoryList
  );

  const productArrList = useSelector(
    (state) => state.productInfo.productList
  );
  const isAddingCampaignProduct = useSelector(
    (state) => state.campaignInfo.isAddingCampaignProduct
  );
  const addedCampaignProduct = useSelector(
    (state) => state.campaignInfo.addedCampaignProduct
  );
  const dispatch = useDispatch();

  const handleSelect = (index, item) => {
    const postData = discounts[index]
    let isExistPro = proInfo.filter(el => el.productId === item._id)
    if (isExistPro.length > 0) {
      setProInfo(l => l.filter(el => el.productId !== item._id));
    } else {
      setProInfo(prevState => [...prevState, postData]);
    }
  }
  const handleSubmit = () => {
    dispatch(SubmitCampaignProducts(discounts.filter(el => el.campaignPrice > 0), id))
  }
  const handleDiscount = (index, price) => {
    discounts[index].campaignPrice = price
    setDiscounts([...discounts])
  }
  // console.log('discounts', discounts)
  // console.log('proInfo', proInfo)

  useEffect(() => {
    if (addedCampaignProduct) {
      history.push('/campaign')
      dispatch(AfterAddedFalse());
    }
  }, [addedCampaignProduct]);
  useEffect(() => {
    dispatch(GetCategoryList());
    dispatch(GetSellerList());
  }, []);
  const makePrice = (list) => {
    let arr = []
    list.forEach(item => {
      const data = { product: item._id, productId: item._id, campaignPrice: 0 }
      arr.push(data)
    });
    return arr
  }
  useEffect(() => {
    if (productArrList !== null && productArrList.length > 0) {
      setDiscounts(makePrice(productArrList))
    }
  }, [productArrList]);
  useEffect(() => {
    if (categoryId.length > 0) {
      dispatch(SubCategoryByCategoryId(categoryId));
    }
  }, [categoryId])
  useEffect(() => {
    if (subCategoryId.length > 0) {
      dispatch(GetProductBySubCategoryId(subCategoryId));
    }
  }, [subCategoryId])
  useEffect(() => {
    dispatch(GetCampaignDetails(id));
  }, [id]);
  console.log('campaignDetails', campaignDetails)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>{campaignName}'s Products</h4>
        <input
          type="text"
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />

      </div>
      <hr />
      <div className="row">
        <div className="col-sm-1"> <h6>Filter</h6></div>
        <div className="col-sm-2"> <h6>Select Category</h6></div>
        <div className="col-sm-3">
          <Select
            options={getCategoryOption(categoryArrList)}
            value={{ label: category }}
            onChange={(e) => {
              setCategory(e.label);
              setCategoryId(e.value);
              setSubCategory("");
              setSubCategoryId("");
            }}
          />
        </div>
        <div className="col-sm-3"><h6>Select Sub Category</h6></div>
        <div className="col-sm-3">
          <Select
            options={getSubCategoryOption(subCategoryArrList)}
            value={{ label: subCategory }}
            onChange={(e) => {
              setSubCategory(e.label);
              setSubCategoryId(e.value);
            }}
          />
        </div>



        {/* <div>
            <h6>Select Seller</h6>
            <Select
              options={getSellerOption(sellerArrList)}
              value={{ label: seller }}
              onChange={(e) => {
                setSeller(e.label);
                setSellerId(e.value);
              }}
            />
          </div> */}
      </div>
      <hr />
      <div className="mt-3">
        {productArrList != null && productArrList.length > 0 && (<>
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th>SL</th>
                <th>Product Name</th>
                <th>Icon</th>
                <th>MRP</th>
                <th>Price</th>
                <th>Campaign</th>
              </tr>
            </thead>
            <tbody>
              {productArrList.map((item, index) => (
                <tr>
                  <td>
                    <input
                      disabled
                      type="checkbox"
                      name="select"
                      checked={discounts.find(v => v.productId === item?._id && v.campaignPrice > 0)}
                    // checked={proInfo.find(v => v.productId === item?._id)}
                    // onChange={() => handleSelect(index, item)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td><img src={item.productIcon.url} width={40} /></td>
                  <td>{item.mrp}</td>
                  <td>{item.regularDiscount}</td>
                  <td>
                    <input
                      disabled={item?.isCampaign}
                      type="number"
                      value={discounts[index]?.campaignPrice || 0}
                      onChange={(e) => handleDiscount(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            className="btn btn-success btn-sm mt-3 text-light float-right"
            onClick={() => !isAddingCampaignProduct && handleSubmit()}
          >
            {isAddingCampaignProduct ? "SUBMITTING" : "SUBMIT"}
          </a>
        </>)}
      </div>
    </>
  );
};

export default CreateCampaignProduct;
