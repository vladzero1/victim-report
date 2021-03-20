export function validatePhoneNumber(phoneNumber: string) {
   if (new RegExp("\\+62[0-9]+|0[0-9]+").test(phoneNumber)) {
     return [{
           field: "phoneNumber",
           message: "invalid phone number",
     }];
   }

  return null;
}

export function validatePasswordLength(password: string | any[], field : string) {
  if (password.length <= 3) {
    return [{
      field: field,
      message: "length must be greater than 3!"
    }];
  }
  return null
}