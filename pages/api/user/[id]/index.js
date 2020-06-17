export default function getUser(req,res) {
    res.json({id: req.query.id})
}