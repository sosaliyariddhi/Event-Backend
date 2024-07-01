export const errorGenerator = (res, status = 400, message) => {
  return res
    .status(status)
    .send({ status, isSuccess: false, error: message, data: null });
};

export const schemaErrorHandler = (schema, body) => {
  let { error } = schema.validate(body);
  console.log("🚀 ~ schemaErrorHandler ~ error:", error);
  if (error) {
    let message = error?.details?.[0]?.message?.replaceAll?.('"', "");
    return message;
  } else return null;
};
