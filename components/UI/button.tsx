import classNames from "classnames";
import { useRef } from "react";
import CcLink from "./link";

interface IProps {
  isDisabled?: boolean;
  ghost?: boolean;
  children: React.ReactNode;
  className?: string;
  asLink?: string;
  onClick?: () => {};
}

export const CcButton = ({
  isDisabled,
  ghost,
  children,
  className,
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
          disabled={isDisabled}
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
        disabled={isDisabled}
        onClick={handleClick}
        className={classNames("bg-blue-500 ", genStyle, className)}
      >
        {children}
      </button>
      {rest.asLink && <CcLink ref={linkRef} to={rest.asLink} className='!m-0'/>}
    </>
  );
};
