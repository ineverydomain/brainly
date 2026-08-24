export function Input({
  placeholder,
  reference,
}: {
  placeholder: string;
  reference?: any;
}) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type={"text"}
        className="px-8 py2 border-2 rounded-sm p-2 m-2"
      ></input>
    </div>
  );
}
