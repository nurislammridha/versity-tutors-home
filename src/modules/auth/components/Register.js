import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { SetFalseLogin, SubmitRoleReg } from "../_redux/AuthAction";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const isLogin = useSelector((state) => state.authInfo.isLogin);
  const loginSuccess = useSelector((state) => state.authInfo.loginSuccess);

  const dispatch = useDispatch()
  const handleReg = () => {
    dispatch(SubmitRoleReg(email, password, cPassword))
  };

  useEffect(() => {
    if (loginSuccess) {
      history.push("/dashboard");
      dispatch(SetFalseLogin());
    }
  }, [loginSuccess]);
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") || "false";
    if (isLogin === true || isLogin === "true") {
      history.push("/dashboard");
    }
  }, []);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      value={email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      value={password}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      onChange={(e) =>
                        setCPassword(e.target.value)
                      }
                      value={cPassword}
                    />
                  </CInputGroup>

                  <CButton color="success" onClick={() => !isLogin && handleReg()}>
                    {isLogin ? "Creating" : "Create Account"}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
