import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CcInput from "../../components/UI/inputs";
import Link from "next/link";

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
        <h1 className="text-3xl font-bold py-6 capitalize">
          {" "}
          create new account
        </h1>
        <span className="text-lg">
          Already a member? <Link href="/auth/signup">Sign Up!</Link>
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
            className="p-5 rounded-lg w-full"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
