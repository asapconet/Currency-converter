import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps } from "formik";
import CcInput from "../../components/UI/inputs";
import Link from "next/link";
import { CcButton } from "../../components/UI/button";

interface FormValues {
  email: string;
  password: string;
}
interface FormProps {
  email: string;
  password: string;
}

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
              <label
                htmlFor="email"
                className="px-2 relative top-5 left-2 text-xs text-gray-300 capitalize"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="inputyouremail@send.com"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className="h-16 px-5 rounded-lg w-full"
              />
              {errors.email && touched.email && (
                <p className="text-[14px] text-red-300 italic lowercase">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="w-full py-4 text-left">
              <label
                htmlFor="password"
                className="px-2 relative top-5 left-2 text-xs text-gray-300 capitalize"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                placeholder="***********"
                className="h-16 px-5 rounded-lg w-full"
              />
              {errors.password && touched.password && (
                <p className="text-[14px] text-red-300 italic lowercase">
                  {errors.password}
                </p>
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

const Login = withFormik<FormProps, FormValues>({
  mapPropsToValues: (props) => ({
    email: props.email || "",
    password: props.password || "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().required("neccesary").email(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .required("Password is required"),
  }),

  handleSubmit(
    { email, password }: FormValues,
    { props, setErrors, setSubmitting }
  ) {
    console.log(email, password);
  },
})(InnerForm);

export default Login;
