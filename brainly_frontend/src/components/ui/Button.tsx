interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-blue-300 text-blue-500",
};
const defaultStyles = "rounded-md flex font-light items-center cursor-pointer";

const sizeStyles = {
  sm: "m-2 px-4 py-1",
  lg: "m-6 px-10 py-4",
  md: "m-4 px-6 py-2",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]}  ${defaultStyles} ${sizeStyles[props.size]} ${[props.fullWidth ? "w-full justify-center" : " "]}  ${[props.loading ? "opacity-50" : " "]} `}
    >
      {props.startIcon ? <div className=" pr-2">{props.startIcon}</div> : null}{" "}
      {props.text}
    </button>
  );
};

<Button variant="primary" size="md" text="Click"></Button>;
