const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        const data = {
            style: ["navbar", "index"],
            script: ["index"],
        }

        res.render("index", data);
    },

    getMenu: function (req, res) {
        const data = {
            style: ["navbarMenu", "menu"],
            topbar: true
        }
        res.render("menu", data);
    },

    getContact: function (req, res) {
        const data = {
            style: ["navbar", "contact"]
        }
        res.render("contact", data);
    },

    getOrderHistory: function (req, res) {
        const data = {
            style: ["navbar", "orderhistory"]
        }
        res.render("orderhistory", data);
    },

    getAbout: function (req, res) {
        const data = {
            style: ["navbar", "about"]
        }
        res.render("about", data);
    },

    getProfile: function (req, res) {
        const data = {
            style: ["navbar", "accountdetails", "profile"]
        }
        res.render("profile", data);
    }
}

module.exports = controller;