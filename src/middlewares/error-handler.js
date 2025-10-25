
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "Error interno";
  if (process.env.NODE_ENV !== "test") console.log(err);
  res.status(status).json({ status: "error", error: msg });
};
