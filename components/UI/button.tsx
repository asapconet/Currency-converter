import classNames from "classnames";

interface IProps {
  isDisabled?: boolean;
  ghost?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => {};
}

export const CcButton = ({
  isDisabled,
  ghost,
  children,
  className,
  ...rest
}: IProps) => {
  const handleClick = () => {
    rest?.onClick?.();
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
    </>
  );
};
