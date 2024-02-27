function CourseField({ field, fieldState, placeholder }) {
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
    </div>
  );
}

export default CourseField;
