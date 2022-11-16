import * as Yup from "yup";
import { withFormik, FormikProps, FormikBag } from "formik";
import { connect, ConnectedProps } from "react-redux";

import { CcButton } from "../../components/UI/button";
// import CcInput from "../../components/UI/inputs";
import CcLink from "../../components/UI/link";
import classNames from "classnames";
import { errorStle, inputStyle, labelStyle } from "./login";
import { endpoints } from "../api/authApi";
import { RootState } from "../../context/store";
import { toast } from "react-toastify";

export interface FormValues {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export interface FormProps {
  // first_name: string;
  // last_name: string;
  email: string;
  password: string;
}

interface myProps {
  value: string;
  id: string;
}

// const CcInput = (props: myProps & FormikProps<myProps>) => {
//   const { id, handleBlur, value, handleChange, errors, touched } =
//     props;
//   return (
//     <div className="w-full pt-4 flex flex-col text-left">
//       <label
//         htmlFor="First Name"
//         className="px-2 relative top-5 left-2 text-xs text-gray-300 capitalize"
//       >
//         {id}
//       </label>
//       <input
//         id={id}
//         type="text"
//         placeholder="Asap"
//         onBlur={handleBlur}
//         onChange={handleChange}
//         value={value}
//         className="h-16 px-5 rounded-lg"
//       />
//       {errors && touched && (
//         <p className="text-[14px] text-red-300 italic lowercase">{errors.id}</p>
//       )}
//     </div>
//   );
// };

const InnerForm = (props: FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <div className="bg-login-hero bg-cover ">
      <div className="bg-gradient-to-r from-black via-black/90 ">
        <div className="flex flex-col gap-y-1 items-start justify-center h-[100vh] px-12 w-[50%]">
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
          <form onSubmit={handleSubmit}>
            <div className="flex h-30 items-center gap-4">
              <div className="w-full pt-4 flex flex-col text-left">
                <label htmlFor="First Name" className={classNames(labelStyle)}>
                  First Name
                </label>
                <input
                  id="first_name"
                  type="text"
                  placeholder="Asap"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  className={classNames(inputStyle)}
                />
                {errors.first_name && touched.first_name && (
                  <p className={classNames(errorStle)}>{errors.first_name}</p>
                )}
              </div>

              <div className="w-full pt-4 flex flex-col text-left">
                <label htmlFor="lastName" className={classNames(labelStyle)}>
                  Last Name
                </label>
                <input
                  id="last_name"
                  type="text"
                  placeholder="A1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  className={classNames(inputStyle)}
                />
                {errors.last_name && touched.last_name && (
                  <p className={classNames(errorStle)}>{errors.last_name}</p>
                )}
              </div>
            </div>
            <div className="w-full py-4 text-left">
              <label htmlFor="Email" className={classNames(labelStyle)}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="inputyouremail@send.com"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                className={classNames(inputStyle)}
              />
              {errors.email && touched.email && (
                <p className={classNames(errorStle)}>{errors.email}</p>
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
            <span className="flex gap-4 my-6">
              <CcButton ghost asLink="/auth/login">
                {" "}
                Login
              </CcButton>
              <CcButton
                type="submit"
                disabled={
                  isSubmitting ||
                  !!(errors.email && touched.email) ||
                  !!(errors.password && touched.password)
                }
              >
                Create account
              </CcButton>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({});

const mapDispatch = {
  registerUser: endpoints.registerUser.initiate,
};

const connector = connect(mapState, mapDispatch);
type MyUpgradedFormProps = ConnectedProps<typeof connector>;

const SignUp = withFormik<MyUpgradedFormProps, FormValues>({
  mapPropsToValues: () => {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },

  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is requireed"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .required("Password is required"),
  }),

  handleSubmit: (
    values: FormValues,
    { props, setSubmitting, resetForm, setValues }
  ) => {
    props.registerUser(values);
    setSubmitting(false);
    resetForm();
    toast.success("done");
    toast.error("error");
  },
})(InnerForm);

export default connector(SignUp);
