const Device = require('../models/device.model')

exports.getDevices = (req, res) => {
    Device.find({})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
}

exports.postThreshold = (req,res) => {
    // console.log(req.body)
    var a = 0;
    const data = req.body
    // console.log(data)
    Device.updateOne({type:"temp", owner:data.owner},
    {
        $set: {
            threshold : {
                min: data.minTemp,
                max: data.maxTemp
            }
        },
    })
    .then(console.log("thanh cong"))
    .catch((err) => console.log(err))

    Device.updateOne({type:"soil",owner:data.owner},
    {
        $set: {
            threshold : {
                min: data.soil,
                max: data.maxSoil
            }
        },
    })
    .then(res.status(200).send("OK"))
    .catch((err) => console.log(err))
}

exports.getThreshold = (req,res) => {
    var thresholds = {}
    Device.find({})
    .then((devices) => {
        devices.forEach((device) => {
            if(device.type === "temp"){
                thresholds.minTemp = device.threshold.min;
                thresholds.maxTemp = device.threshold.max
                // threshold = {
                //     ...threshold,
                //     minTemp:device.threshold.min,
                //     maxTemp:device.threshold.max
                // }
            }
            if(device.type === "soil"){
                thresholds.soil = device.threshold.min;
                thresholds.maxSoil = device.threshold.max
                // threshold = {
                //     ...threshold,
                //     soil:device.threshold.min,
                //     maxSoil:device.threshold.max
                // }
            res.send(thresholds)
            }
        })
    })
    .catch((err) => console.log(err))

}