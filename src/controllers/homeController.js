class HomeController {
    index(req, res) {
        return res.json('INDEX')
    }
}

module.exports = new HomeController()