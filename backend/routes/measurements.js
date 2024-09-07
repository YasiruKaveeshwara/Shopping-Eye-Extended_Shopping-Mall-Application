const router = require("express").Router();
let Measurement = require("../models/Measurement");
const { determineBodyType } = require("../util/bodyTypeHelper"); // Import the helper function


// Save Measurements
router.route("/saveMeasurements").post((req, res) => {
    const { bust, waist, hip} = req.body;

    // Determine body type
    const bodyType = determineBodyType({ bust, waist, hip});

    const newMeasurement = new Measurement({
        bust,
        waist,
        hip, 
        // shoulders, 
        bodyType
    });

    newMeasurement.save()
        .then(() => res.json("Measurements Saved"))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with saving measurements", error: err.message });
        });
});

// Get all measurements
router.route("/allMeasurements").get((req, res) => {
    Measurement.find()
        .then((measurements) => {
            res.json(measurements);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with showing measurements", error: err.message });
        });
});

// Update measurements by ID
router.route("/updateMyMeasurements/:id").put(async (req, res) => {
    try {
        let myMeasurementId = req.params.id;
        const { bust, waist, hip } = req.body;


        // Determine body type
        const bodyType = determineBodyType(bust, waist, hip);

        console.log("Received ID:", myMeasurementId);
        console.log("Received Measurements:", { bust, waist, hip }); // Log received data

        
        const updateMyMeasurements = {
            bust,
            waist,
            hip,
            bodyType
        };

        const updated = await Measurement.findByIdAndUpdate(myMeasurementId, updateMyMeasurements);
        if (!updated) {
            return res.status(404).send({ status: "Measurement not found" });
        }

        res.status(200).send({ status: "Your Measurements Updated", measurements: updated });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating Your Measurements", error: err.message });
    }
});

// Delete measurements by ID
router.route("/deleteMyMeasurements/:id").delete(async (req, res) => {
    try {
        let myMeasurementId = req.params.id;
        const deleted = await Measurement.findByIdAndDelete(myMeasurementId);

        if (!deleted) {
            return res.status(404).send({ status: "Measurement not found" });
        }

        res.status(200).send({ status: "Your Measurements Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error in deleting Your Measurements", error: err.message });
    }
});

// Get single measurement by ID
router.route("/getUserMeasurements/:id").get(async (req, res) => {
    let myMeasurementsId = req.params.id;
    try {
        const userMeasurements = await Measurement.findById(myMeasurementsId);

        if (!userMeasurements) {
            return res.status(404).send({ status: "User Measurements not found" });
        }

        res.status(200).send({ status: "User Measurements Fetched", userMeasurements });
    } catch (error) {
        console.error("Error fetching User Measurements:", error.message);
        res.status(500).send({ status: "Error with get User Measurements", error: error.message });
    }
});

module.exports = router;
