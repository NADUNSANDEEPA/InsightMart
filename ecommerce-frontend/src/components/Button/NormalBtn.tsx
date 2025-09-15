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

interface NormalBtnProps {
  text?: string;
  color?: MDBColor;
  backgroundColor?: string;
  borderColor?: string;
  borderSize?: string;
  borderRadius?: string;
  shadow?: string;
  padding?: string;
  size?: "sm" | "lg";
  outline?: boolean;
  block?: boolean;
  rounded?: boolean;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const NormalBtn: React.FC<NormalBtnProps> = ({
  text,
  color = "primary",
  backgroundColor,
  borderColor,
  borderSize,
  borderRadius,
  shadow,
  padding,
  size,
  outline = false,
  block = false,
  rounded = false,
  icon,
  onClick,
  disabled = false,
  style,
  className,
  type = "button",
}) => {
  const customStyles: React.CSSProperties = {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: borderSize,
    borderRadius: borderRadius,
    boxShadow: shadow,
    padding: padding,
    ...style,
  };

  return (
    <MDBBtn
      color={color}
      outline={outline}
      size={size}
      block={block}
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
