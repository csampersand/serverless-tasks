const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    client
      .query(
        q.Foreach(
          q.Paginate(
            q.Match(
              // query index
              q.Index("all_todos") // specify source
            )
          ),
          q.Lambda("todo", q.Delete(q.Var("todo")))
        )
      )
      .then(ret => res.status(200).send(ret));
    // ok
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
