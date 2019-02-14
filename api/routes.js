const express = require('express');
const router = express.Router();
var http = require("https");
const { init } = require('rajaongkir-node-js');
const request = init('API_KEY', 'starter');
//const RajaOngkir = require('rajaongkir-nodejs').Starter('c506cdfc35a33e3d47fb068b799c0630');

router.get("/provinsi", function (req, res) {
    const province = request.get('/province')
    province.then(prov => {
        let js = JSON.parse(prov);
        res.send(js);
    })

    // RajaOngkir.getProvinces().then(function (result) {
    //     res.json(result);
    // }).catch(function (error) {
    //     console.log(error);
    // });
})

router.get("/kota/:id", function (req, res) {
    const allCityInProvince = request.get(`/city?&province=${req.params.id}`)
    allCityInProvince.then(city => {
        let citi = JSON.parse(city);
        res.send(citi);
    })

    // RajaOngkir.getCities().then(function (result) {
    //     res.json(result);
    // }).catch(function (error) {
    //     console.log(error);
    // });
})

router.post('/ongkir', function (req, res) {
    const form = req.body;
    const data = {
        origin: form.origin,
        destination: form.destination,
        weight: form.weight,
        courier: form.courier // bisa merequest satu atau beberapa kurir sekaligus
    }
    const cost = request.post('cost', data)
    cost.then(cst => {
        res.send(cst);
    })
})

module.exports = router