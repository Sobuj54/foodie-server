import app from "./app.mjs";

const port = 3000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
