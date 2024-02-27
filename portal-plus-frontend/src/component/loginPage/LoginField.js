function LoginField({ field, fieldState, type, placeholder }) {
  return (
    <div className="w-full mb-5">
      <input
        className={`border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500 ${
          fieldState.error ? "border-red-500" : ""
        } `}
        type={type}
        {...field}
        placeholder={placeholder}
      />
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}

export default LoginField;
