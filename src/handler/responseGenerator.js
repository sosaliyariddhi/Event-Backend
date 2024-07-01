export const responseGenerator = (res, data, message) => {
  return res
    .status(200)
    .send({ code: 200, error: null, isSuccess: true, data, message });
};
