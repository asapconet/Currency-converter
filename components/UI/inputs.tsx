import React from "react";
import { FaEnvelope, FaArrowRight, FaRegEye } from "react-icons/fa";
import classNames from "classnames";

interface IProps {
  textarea?: boolean;
  errors?: string;
  label?: string;
  name?: string;
  type?: string;
  id: string;
  placeholder?: string;
  className?: string;
  formik?: any;
}
const CcInput = React.forwardRef(
  ({ textarea, errors, label, className, id, formik, ...rest }: IProps) => {
    const icons: any = {
      email: <FaEnvelope />,
      rigthIcon: <FaArrowRight />,
      eye: <FaRegEye />,
    };

    if (textarea) {
      return (
        <div className="w-full text-left">
          {label && (
            <label htmlFor={rest?.name} className="font-bold text-lg">
              {label}
            </label>
          )}
          <div className="relative w-full">
            <span className="absolute -translate-y-1/2">{icons.rightIcon}</span>
            <textarea
              id={rest.name}
              // ref={ref}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={classNames({ "pl-12": icons.rightIcon })}
              {...rest}
            />
            {formik.errors[id] && formik.touched[id] && (
              <p className="text-[14px] text-first-error italic text-error lowercase">
                {formik.errors[id]}
              </p>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className=" w-full py-4 text-left">
        {label && (
          <label htmlFor={rest.name} className=" px-2 text-sm capitalize">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <span className="absolute -translate-y-1/2 text-md top-1/2 right-5">
            {rest.type === "password" ? icons.eye : icons.email}
          </span>
          <input
            // ref={ref}
            id={rest.name}
            type={rest.type}
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            className={classNames(
              { "pr-44 w-full text-xl font-bold": icons[icons.rightIcon] },
              className
            )}
            {...rest}
          />
          <span className="absolute -translate-y-1/2 text-md">
            {icons[icons.rightIcon]}
          </span>
          {/* {formik.errors[id] && formik.touched[id] && (
          <p className="text-[14px] text-first-error italic text-error lowercase">
            {formik.errors[id]}
          </p>
        )} */}
        </div>
      </div>
    );
  }
);

export default CcInput;
