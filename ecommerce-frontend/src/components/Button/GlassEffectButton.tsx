import React, { type CSSProperties, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";

interface GlassEffectButtonProps {
  text: string;
  borderSize?: string;
  shadow?: string;
  padding?: string;
  icon?: string;
  borderRadius?: string;   
  onClick?: () => void;
  style?: React.CSSProperties;
}


const GlassEffectButton: React.FC<GlassEffectButtonProps> = ({
  text,
  borderSize = "1.5px",
  borderRadius,
  shadow = "0 2px 5px rgba(0,0,0,0.3)",
  padding = "0.4rem 1rem",
  icon,
  onClick,
  style,
}) => {
  const [hover, setHover] = useState(false);

  const baseStyle: CSSProperties = {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "rgba(146, 21, 21, 1)",
    color: "#d4ebd5ff",
    fontSize: "13px",
    fontWeight: "400",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderRadius: borderRadius || "1.5rem", 
    border: `${borderSize} solid rgba(255,255,255,0.3)`,
    boxShadow: shadow,
    padding,
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.3s ease",
    userSelect: "none",
    ...style,
  };

  const hoverStyle: CSSProperties = {
    backgroundColor: "#4a8051",
    color: "#f0fff4",
    borderColor: "rgba(255,255,255,0.6)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div
      className="badge"
      style={hover ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <MDBIcon fas icon={icon} />
      {text}
    </div>
  );
};

export default GlassEffectButton;
