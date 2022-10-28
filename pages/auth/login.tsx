import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CcInput from "../../components/UI/inputs";
import Link from "next/link";
import { CcButton } from "../../components/UI/button";

interface IProps {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required("neccesary").email(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .required("Password is required"),
});

const Login = () => {
  const handleSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <>
      <div className="flex flex-col gap-y-5 items-start pt-44 h-[100vh] px-12 bg-gray-700 w-[50%]">
        <h1 className="text-[3.1rem] font-bold py-6 capitalize">
          {" "}
          Login to your account
        </h1>
        <span className="text-xl font-normal text-gray-300">
          Not a member?{""}
          <span className="text-sm text-blue-400 font-semibold px-2">
            <Link href="/auth/signup">Sign Up!</Link>
          </span>
        </span>
        <form onSubmit={formik.handleSubmit}>
          <CcInput
            id="nameReg"
            type="text"
            label="email"
            placeholder="input your username[email]"
            {...formik.getFieldProps("email")}
            className="p-5 rounded-lg w-full"
          />
          <CcInput
            id="nameReg"
            type="password"
            label="password"
            placeholder="********** "
            {...formik.getFieldProps("email")}
            className="p-5 rounded-lg w-[30rem]"
          />
          <span className="flex gap-7">
            <CcButton ghost isDisabled>
              Sign Up{" "}
            </CcButton>
            <CcButton>!Sign Up </CcButton>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
