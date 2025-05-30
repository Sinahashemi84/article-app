import Link from "next/link";
import React, { ReactNode, MouseEvent } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  width?: string;
  textColor?: string;
  borderColor?: string;
  px?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  width,
  textColor,
  borderColor,
  px,
  href,
  onClick,
  disabled,
}) => {
  const commonClasses = `h-[42px] ${width || ""} ${textColor || ""} ${
    borderColor || ""
  } flex justify-center border items-center gap-1 rounded-[10px] bg-white dark:bg-gray-800 align-middle ${
    px || ""
  }`;

  if (href) {
    return (
      <Link href={href}>
        <a className={commonClasses}>{children}</a>
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${commonClasses} ${disabled ? "cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
