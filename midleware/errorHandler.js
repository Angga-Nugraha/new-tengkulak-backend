// Pesan error yang diterima jika terjadi error pada mongoose atau database
export const dbError = (err, req, res, next) => {
  if (err.name === "CastError") {
    err.status = 404;
    err.message = "Not Found";
  }
  if (err.name === "ValidationError") {
    err.status = 402;
    err.message = Object.values(err.errors).map((e) => e.message)[0];
  }
  if (err.name === "MongoServerError") {
    const msg = Object.values(err.keyValue)[0];

    err.status = 404;
    err.message = `${msg} is already registered`;
  }
  next(err);
};

// Pesan default error
export const errorMessage = (err, rew, res, next) => {
  const { status = 500, message = "Something went wrong..." } = err;
  res.status(status).json({
    status: "failed",
    msg: message
  });
};
