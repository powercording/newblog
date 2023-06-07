import { CSSProperties } from "react";

interface InputProps extends Omit<React.ComponentProps<"input">, "style"> {
  style?: CSSProperties;
}

export default function Input({ ...props }: InputProps) {
  const { style } = props;
  const inputStyle = style || {};
  return (
    <input
      className="p-4 rounded-md focus:outline-none valid:focus:ring-2 valid:focus:ring-green-500 required:focus:ring-2 required:focus:ring-red-500 peer"
      minLength={6}
      maxLength={20}
      style={inputStyle}
      required
      {...props}
    />
  );
}
