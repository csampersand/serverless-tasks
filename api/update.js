const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const { id, complete } = req.query;
  try {
    client
      .query(
        q.Update(q.Ref(q.Collection("todos"), id), {
          data: {
            complete: complete === "true"
          }
        })
      )
      .then(ret => res.status(200).send(ret));
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
