const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "password",
    "gender",
    "age",
    "about",
    "speciality",
    "photoUrl",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = validateProfileEditData;
