import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";

type MDBColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "white"
  | "none"
  | "link"
  | "muted"
  | "tertiary"
  | undefined;

type BtnSize = "sm" | "md" | "lg" | "xl";

interface NormalBtnProps {
  text?: string;
  color?: MDBColor; // MDBBtn color
  textColor?: string; // new: text color
  size?: BtnSize; 
  outline?: boolean; 
  rounded?: boolean; 
  icon?: string; 
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderSize?: string;
  borderRadius?: string;
  shadow?: string;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

const NormalBtn: React.FC<NormalBtnProps> = ({
  text,
  color = "primary",
  textColor,
  size = "md",
  outline = false,
  rounded = false,
  icon,
  onClick,
  disabled = false,
  backgroundColor,
  borderColor,
  borderSize,
  borderRadius,
  shadow,
  padding,
  className,
  style,
  type = "button",
}) => {
  const computedBorderRadius = rounded
    ? size === "sm"
      ? "12px"
      : size === "md"
      ? "16px"
      : size === "lg"
      ? "20px"
      : "24px"
    : borderRadius || "4px";

  const computedPadding =
    padding ||
    (size === "sm"
      ? "6px 12px"
      : size === "md"
      ? "8px 16px"
      : size === "lg"
      ? "10px 20px"
      : "12px 24px");

  const customStyles: React.CSSProperties = {
    backgroundColor: outline ? "transparent" : backgroundColor,
    borderColor,
    borderWidth: borderSize,
    borderRadius: computedBorderRadius,
    boxShadow: shadow,
    padding: computedPadding,
    color: textColor, 
    ...style,
  };

  return (
    <MDBBtn
      color={color}
      outline={outline}
      size={size === "sm" ? "sm" : size === "md" ? undefined : "lg"} 
      rounded={rounded}
      onClick={onClick}
      disabled={disabled}
      style={customStyles}
      className={className}
      type={type}
    >
      {icon && (
        <i
          className={`fas fa-${icon}`}
          style={{ marginRight: text ? 8 : 0 }}
          aria-hidden="true"
        />
      )}
      {text}
    </MDBBtn>
  );
};

export default NormalBtn;
