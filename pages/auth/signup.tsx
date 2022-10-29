import * as Yup from "yup";
import { useFormik } from "formik";

import { CcButton } from "../../components/UI/button";
import CcInput from "../../components/UI/inputs";
import CcLink from "../../components/UI/link";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is requireed"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required(),
});

const Signup = () => {
  const handleSubmit = () => {};

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <div>
      <div className="flex flex-col gap-y-1 items-start justify-center h-[100vh] px-12 bg-gray-700 w-[50%]">
        <span className="text-xl font-semibold uppercase text-gray-300">
          Start for free
        </span>
        <h1 className="text-[3.1rem] font-bold pb-6 capitalize">
          {" "}
          Creat an account<b className="text-blue-500 text-lx ml-1">.</b>
        </h1>
        <span className="text-xl font-normal text-gray-300">
          Already a Member?{""}
          <span className="text-sm text-blue-400 font-semibold px-2">
            <CcLink to="/auth/login">Sign In!</CcLink>
          </span>
        </span>
        <form onSubmit={formik.handleSubmit}>
          <span className="flex gap-4">
            <CcInput
              id="fistName"
              type="text"
              label="First Name"
              placeholder="Asap"
              // {...formik.getFieldProps("firstName")}
              className="p-5 rounded-lg"
            />
            <CcInput
              id="lastName"
              type="text"
              label="Last Name"
              placeholder="A1"
              className="p-5 rounded-lg"
            />
          </span>
          <CcInput
            id="email"
            type="email"
            label="Email"
            placeholder="inputyouremail@send.com"
            className="p-5 rounded-lg w-full"
          />
          <CcInput
            id="password"
            type="password"
            label="Password"
            placeholder="***********"
            className="p-5 rounded-lg w-full"
          />

          <span className="flex gap-4 my-6">
            <CcButton ghost asLink="/auth/login">
              {" "}
              Login
            </CcButton>
            <CcButton>Create account</CcButton>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
