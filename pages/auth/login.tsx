import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps } from "formik";
import { connect, ConnectedProps } from "react-redux";
import CcInput from "../../components/UI/inputs";
import Link from "next/link";
import { CcButton } from "../../components/UI/button";
import classNames from "classnames";
import { endpoints } from "../api/authApi";
import { RootState } from "../../context/store";

interface FormValues {
  username: string;
  password: string;
}
interface FormProps {
  username: string;
  password: string;
  FormData: React.ReactNode;
}

//repeated styles simplified
export const inputStyle =
  "h-16 px-5 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500";
export const labelStyle =
  "px-2 relative top-6 left-2 text-xs text-gray-400 capitalize";
export const errorStle = "text-[14px] text-red-300 italic lowercase";

const InnerForm = (props: FormProps & FormikProps<FormValues>) => {
  const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
    props;

  return (
    <div className="bg-login-hero bg-cover">
      <div className="bg-gradient-to-r from-black via-gray-800/95">
        <div className="flex flex-col gap-y-5 items-start justify-center h-[100vh] px-12 w-[50%]">
          <h1 className="text-[3.1rem] font-bold py-6 capitalize">
            {" "}
            Login to your account<b className="text-blue-500 text-lx ml-1">.</b>
          </h1>
          <span className="text-xl font-normal text-gray-300">
            Not a member?{""}
            <span className="text-sm text-blue-400 font-semibold px-2">
              <Link href="/auth/signup">Sign Up!</Link>
            </span>
          </span>
          <form onSubmit={handleSubmit}>
            <div className="w-full py-4 text-left">
              <label htmlFor="email" className={classNames(labelStyle)}>
                Email
              </label>
              <input
                id="username"
                type="username"
                placeholder="inputyouremail@send.com"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                className={classNames(inputStyle)}
              />
              {errors.username && touched.username && (
                <p className={classNames(errorStle)}>{errors.username}</p>
              )}
            </div>
            <div className="w-full py-4 text-left">
              <label htmlFor="Password" className={classNames(labelStyle)}>
                Password
              </label>
              <input
                id="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                placeholder="***********"
                className={classNames(inputStyle)}
              />
              {errors.password && touched.password && (
                <p className={classNames(errorStle)}>{errors.password}</p>
              )}
            </div>
            <span className="flex gap-7">
              <CcButton asLink="/auth/signup" ghost>
                Create account{" "}
              </CcButton>
              <CcButton type="submit">Log me On</CcButton>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = {
  loginUser: endpoints.loginUser.initiate,
};

const connector = connect(mapState, mapDispatch);
type MyUpgradedFormProps = ConnectedProps<typeof connector>;

const Login = withFormik<MyUpgradedFormProps, FormValues>({
  mapPropsToValues: (props) => ({
    username: "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    username: Yup.string().required("neccesary").email(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .required("Password is required"),
  }),
  
  handleSubmit: (values: FormValues, { props, setSubmitting }) => {
    const formValue = new FormData();
    formValue.append("username", values.username);
    formValue.append("password", values.password);

    props.loginUser(formValue);
    setSubmitting(true);
    console.log(formValue);
  },
})(InnerForm);

export default connector(Login);
