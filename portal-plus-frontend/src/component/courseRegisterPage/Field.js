function Field({ field, fieldState, placeholder, error }) {
  return (
    <div>
      <input
        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
        type="text"
        {...field}
        placeholder={placeholder}
      />
      {fieldState.error && (
        <p className="text-red-500">{fieldState.error.message}</p>
      )}
      {error ? <p className="text-red-500">لا يوجد مادة بهذا الرقم</p> : ""}
    </div>
  );
}

export default Field;
