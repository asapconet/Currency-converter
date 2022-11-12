import * as Yup from "yup";
import { withFormik, FormikProps } from "formik";

import { CcButton } from "../../components/UI/button";
// import CcInput from "../../components/UI/inputs";
import CcLink from "../../components/UI/link";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
        <form onSubmit={handleSubmit}>
          <div className="flex h-30 items-center gap-4">
            <div className="w-full pt-4 flex flex-col text-left">
              <label
                htmlFor="First Name"
                className="px-2 relative top-5 left-2 text-xs capitalize"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Asap"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                className="h-16 px-5 rounded-lg"
              />
              {errors.firstName && touched.firstName && (
                <p className="text-[14px] text-red-300 italic lowercase">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="w-full pt-4 flex flex-col text-left">
              <label
                htmlFor="First Name"
                className="px-2  relative top-5 left-2 text-xs capitalize"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="A1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                className="h-16 px-5 rounded-lg"
              />
              {errors.lastName && touched.lastName && (
                <p className="text-[14px] text-red-300 italic lowercase">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="w-full py-4 text-left">
            <label
              htmlFor="First Name"
              className="px-2 relative top-5 left-2 text-xs capitalize"
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
              htmlFor="First Name"
              className="px-2 relative top-5 left-2 text-xs capitalize"
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
  );
};

const SignUp = withFormik<FormProps, FormValues>({
  mapPropsToValues: (props) => ({
    firstName: props.firstName || "",
    lastName: props.lastName || "",
    email: props.email || "",
    password: props.password || "",
  }),

  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is requireed"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required(),
  }),

  handleSubmit(
    { firstName, lastName, email, password }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    console.log(firstName, lastName, email, password);
  },
})(InnerForm);

export default SignUp;
