import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetReportConnectionList } from "../_redux/ReportConnectionAction";
import { calculateTotalPrice } from "src/services/GlobalFunction";
const ReportConnectionList = () => {
  const reportConnectionArrList = useSelector(
    (state) => state.reportConnectionInfo.reportConnectionList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetReportConnectionList());
  }, []);

  console.log('reportConnectionArrList', reportConnectionArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Connection Selling Report</h4>

      </div>
      <div className="mt-3">
        {reportConnectionArrList != null && reportConnectionArrList.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Package</th>
                <th>Price</th>
                <th>Buyer</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {reportConnectionArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.connectionPackageId.name}</td>
                  <td>{item.connectionPackageId.price}</td>
                  <td>{`${item.clientId.firstName} ${item.clientId.lastName}`}</td>
                  <td>{item.clientId.isTutorAccount ? "Tutor" : "Student"}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} ><h5>Total Price</h5></td>
                <td colSpan={3} ><h5>{calculateTotalPrice(reportConnectionArrList)}</h5></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="alert alert-success mt-5 text-center">No report connection found</div>
        )}
      </div>
    </>
  );
};

export default ReportConnectionList;
