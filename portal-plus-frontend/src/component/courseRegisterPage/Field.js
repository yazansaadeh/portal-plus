function Field({ field, fieldState, placeholder, value }) {
  return (
    <div>
      <input
        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        type="text"
        {...field}
        placeholder={placeholder}
        value={value}
      />
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}

export default Field;
