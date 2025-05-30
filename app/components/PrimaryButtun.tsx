import Link from "next/link";
import React, { ReactNode, MouseEvent } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  width?: string;
  bgColor?: string;
  px?: string;
  disabled?: boolean;
  href?: string;
  clickHandler?: (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  width,
  bgColor,
  px,
  disabled,
  href,
  clickHandler,
}) => {
  const commonClasses = `${width || ""} h-[42px] ${
    bgColor || ""
  } flex items-center justify-center gap-1 rounded-[10px] align-middle font-semibold dark:text-white text-gray-800 ${
    px || ""
  }`;

  if (href) {
    return (
      <Link href={href}>
        <div className={commonClasses}>{children}</div>
      </Link>
    );
  }

  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      className={`${commonClasses} ${disabled ? "cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
