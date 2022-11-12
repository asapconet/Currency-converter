import classNames from "classnames";
import { useRef } from "react";
import CcLink from "./link";

interface IProps {
  disabled?: any;
  type?: string;
  ghost?: boolean;
  children: React.ReactNode;
  className?: string;
  asLink?: string;
  onClick?: () => {};
}

export const CcButton = ({
  type,
  ghost,
  children,
  className,
  disabled,
  ...rest
}: IProps) => {
  const linkRef = useRef<HTMLElement>(null);

  const handleClick = () => {
    rest?.onClick?.();
    if (rest.asLink) linkRef.current?.click();
  };

  const genStyle =
    "flex items-center justify-center sm:w-56 my-4 font-bold py-4 hover:animate-pulse rounded-[50px]";

  if (ghost) {
    return (
      <>
        <button
          {...rest}
          type="submit"
          disabled={disabled}
          onClick={handleClick}
          role="button"
          className={classNames("bg-gray-400 ", genStyle, className)}
        >
          {children}
        </button>
        {rest.asLink && <CcLink ref={linkRef} to={rest.asLink} />}
      </>
    );
  }

  return (
    <>
      <button
        {...rest}
        disabled={disabled}
        onClick={handleClick}
        type="submit"
        className={classNames("bg-blue-500 ", genStyle, className)}
      >
        {children}
      </button>
      {rest.asLink && (
        <CcLink ref={linkRef} to={rest.asLink} className="!m-0" />
      )}
    </>
  );
};
