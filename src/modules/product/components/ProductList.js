import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import {
  GetProductByCategory,
  GetProductList,
  PreUpdateProduct,
  RemoveProImg,
} from "../_redux/ProductAction";
const ProductList = () => {
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const productInfo = useSelector((state) => state.productInfo.productList);
  const { pagination } = productInfo || {}
  const { currentPage, nextPage, previousPage, totalPage } = pagination || {}
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this product?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(RemoveProImg(item)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleEdit = (data, id) => {
    // dispatch(PreUpdateProduct(data));
    history.push(`/product-edit/${id}`);
  };
  const handlePagination = (page) => {
    dispatch(GetProductList(search, page));
  };
  const handleView = (data) => {
    window.open(`http://localhost:3000/details/${data._id}`, '_blank')
  };
  // useEffect(() => {
  //   if (category && category.label.length > 0) {
  //     dispatch(GetProductByCategory(category.value));
  //   }
  // }, [category]);
  useEffect(() => {
    dispatch(GetProductList());
  }, []);
  useEffect(() => {
    dispatch(GetProductList(search));
  }, [search]);
  return (
    <>
      <div className="row alert alert-secondary">
        <div className="col-sm-2">
          <h6>Product List</h6>
        </div>
        <div className="col-sm-2">
          {/* <h6>Select Category</h6> */}
        </div>
        <div className="col-sm-2">
          {/* <Select
            options={getCategoryOption(categoryArrList)}
            value={{ label: category.label }}
            onChange={(e) => setCategory(e)}
          /> */}
        </div>
        <div className="col-sm-1">
          <h6>Search</h6>
        </div>
        <div className="col-sm-3">
          <input
            className="form-control"
            name="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <a
            className="btn btn-success btn-sm text-light"
            onClick={() => history.push("/product-add")}
          >
            Add Product
          </a>
        </div>
      </div>
      <div className="mt-3">
        {productInfo != null && productInfo?.products?.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th width="200px">Name</th>
                <th>Category</th>
                <th>ICON</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productInfo.products.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.productName.slice(0, 15)}</td>
                  <td>{item.categoryInfo.categoryName}</td>
                  <td>
                    <img
                      src={item.productIcon.url}
                      width="60"
                      height="40"
                    />
                  </td>
                  <td>{item.isActive ? "Active" : "In Active"}</td>
                  <td>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => handleView(item)}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                    <a
                      className="btn btn-outline-success btn-sm mr-2"
                      onClick={() => handleEdit(item, item._id)}
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item)}
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {previousPage !== null && (<li
            onClick={() => handlePagination(previousPage)}
            class="page-item cp"><a class="page-link">Previous</a>
          </li>)}
          {(currentPage - 2) > 0 && (<li
            onClick={() => handlePagination(currentPage - 2)}
            class="page-item cp"><a class="page-link">{currentPage - 2}</a>
          </li>)}
          {(currentPage - 1) > 0 && (<li
            onClick={() => handlePagination(currentPage - 1)}
            class="page-item cp"><a class="page-link">{currentPage - 1}</a>
          </li>)}

          {totalPage !== currentPage && (<li
            //  onClick={() => handlePagination(currentPage)}
            class={totalPage !== currentPage ? "page-item cp active" : "page-item cp"}><a class="page-link" href="#">{currentPage}</a>
          </li>)}
          {(currentPage + 1) <= 3 && totalPage > 2 && (<li
            onClick={() => handlePagination(currentPage + 1)}
            class="page-item cp"><a class="page-link">{currentPage + 1}</a>
          </li>)}
          {(currentPage + 2) == 3 && totalPage > 2 && (<li
            onClick={() => handlePagination(currentPage + 1)}
            class="page-item cp"><a class="page-link">{currentPage + 2}</a>
          </li>)}
          {(totalPage - currentPage) > 1 && (<li class="page-item"><a class="page-link">-------</a></li>)}
          <li
            onClick={() => handlePagination(totalPage)}
            class={totalPage === currentPage ? "page-item cp active" : "page-item cp"}><a class="page-link">{totalPage}</a></li>
          {nextPage !== null && (<li
            onClick={() => handlePagination(nextPage)}
            class="page-item cp"><a class="page-link">Next</a>
          </li>)}
        </ul>
      </nav>
    </>
  );
};

export default ProductList;
