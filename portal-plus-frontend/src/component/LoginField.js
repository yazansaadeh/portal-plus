function LoginField({ field, fieldState, type }) {
  return (
    <div>
      <input type={type} {...field} style={{ marginBottom: "5px" }} />
      {fieldState?.error && (
        <p className="red-text" style={{ marginBottom: "20px" }}>
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}

export default LoginField;
