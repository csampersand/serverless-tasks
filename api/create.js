const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const { text } = req.query;
  if (!text) {
    res.status(500).send("Invalid text");
  } else {
    try {
      client
        .query(
          q.Create(q.Collection("todos"), {
            data: {
              text,
              complete: false
            }
          })
        )
        .then(ret => res.status(200).send(ret));
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  }
};
