export type FormError = {
  errField: string;
  errMsg: string;
};

export const fieldIsNotEmpty = (
  FieldName: string,
  variable: string
): FormError | null => {
  console.log(variable)
  if (variable === "") {
    return {
      errField: FieldName,
      errMsg: `${FieldName} must not be empty`,
    };
  }
  return null;
};
