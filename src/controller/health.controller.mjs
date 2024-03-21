export const healthCheck = async (req, res) => {
  res.send({ message: "Health OK!" });
};
