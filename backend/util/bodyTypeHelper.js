
function determineBodyType(waist, bust, hip, shoulders, height, weight) {
    // const whr = waist / hip;
    // const bwr = bust / waist;
    // const bhr = bust / hip;

    // if (bwr >= 1.1 && whr >= 0.7 && bhr >= 1.0) {
    //     return "Hourglass";
    // } else if (whr < 0.8 && bhr < 1.0) {
    //     return "Pear";
    // } else if (whr >= 0.8 && (bwr <= 1.0 || bhr > 1.0)) {
    //     return "Apple";
    // } else if (Math.abs(bust - waist) < 5 && Math.abs(waist - hip) < 5) {
    //     return "Rectangle";
    // } else if (bust > waist && bust > hip) {
    //     return "Inverted Triangle";
    // } else {
    //     return "Undefined";
    // }


    // const { waist, bust, hip, shoulders, height, weight } = measurements;

    // Store body types from different formulas
    const bodyTypes = [];

    // 1. Waist-to-Hip Ratio (WHR)
    const WHR = waist / hip;
    if (WHR < 0.8) bodyTypes.push("Pear Shape");
    else if (WHR <= 0.9) bodyTypes.push("Hourglass");
    else bodyTypes.push("Apple Shape");

    // 2. Bust-to-Waist Ratio (BWR)
    const BWR = bust / waist;
    if (BWR >= 1.5) bodyTypes.push("Hourglass");
    else if (BWR >= 1.0 && BWR < 1.5) bodyTypes.push("Rectangle");
    else bodyTypes.push("Inverted Triangle");

    // 3. Hip-to-Bust Ratio (HBR)
    const HBR = hip / bust;
    if (HBR > 1.05) bodyTypes.push("Pear Shape");
    else if (HBR < 0.9) bodyTypes.push("Inverted Triangle");
    else bodyTypes.push("Hourglass");

    // 4. Bust-to-Hip Ratio (BHR)
    const BHR = bust / hip;
    if (BHR > 1) bodyTypes.push("Inverted Triangle");
    else if (BHR === 1) bodyTypes.push("Hourglass");
    else bodyTypes.push("Pear Shape");

    // 5. Shoulder-to-Hip Ratio (SHR)
    const SHR = shoulders / hip;
    if (SHR > 1.05) bodyTypes.push("Inverted Triangle");
    else if (SHR < 0.95) bodyTypes.push("Pear Shape");
    else bodyTypes.push("Hourglass");

    // 6. Waist-to-Height Ratio (WHtR)
    const WHtR = waist / height;
    if (WHtR <= 0.5) bodyTypes.push("Ideal");
    else bodyTypes.push("Apple Shape");

    // 7. Hip-to-Waist Difference
    const hipWaistDifference = hip - waist;
    if (hipWaistDifference > 10) bodyTypes.push("Pear Shape");
    else if (hipWaistDifference < 5) bodyTypes.push("Apple Shape");
    else bodyTypes.push("Hourglass");

    // 8. Waist-to-Bust Difference
    const bustWaistDifference = bust - waist;
    if (bustWaistDifference >= 22) bodyTypes.push("Hourglass");
    else bodyTypes.push("Rectangle");

    // 9. Bust-Waist-Hip Ratio Comparison
    if (waist < bust && waist < hip) bodyTypes.push("Hourglass");
    else if (waist === bust && waist === hip) bodyTypes.push("Rectangle");
    else if (bust > waist && bust > hip) bodyTypes.push("Apple");

    // 10. Waist-to-Hip-to-Bust Composite
    if ((waist / bust < 0.75) && (waist / hip < 0.75)) bodyTypes.push("Hourglass");
    else bodyTypes.push("Rectangle");

    // 11. Body Mass Index (BMI)
    weight = measurements.weight || 65;  // Default weight if not provided
    const heightMeters = height / 100;  // Convert height to meters
    const BMI = weight / (heightMeters ** 2);
    if (BMI >= 25) bodyTypes.push("Apple Shape");
    else bodyTypes.push("Ideal");

    // 12. Waist-to-Shoulder Ratio
    const WSR = waist / shoulders;
    if (WSR < 0.75) bodyTypes.push("Inverted Triangle");
    else if (WSR >= 0.75 && WSR <= 0.85) bodyTypes.push("Hourglass");
    else bodyTypes.push("Rectangle");

    // 13. Bust-to-Shoulder Ratio
    const BSR = bust / shoulders;
    if (BSR < 0.9) bodyTypes.push("Inverted Triangle");
    else if (BSR >= 0.9 && BSR <= 1.1) bodyTypes.push("Hourglass");
    else bodyTypes.push("Rectangle");

    // Count occurrences of each body type
    const bodyTypeCounts = bodyTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    // Find the most frequent body type
    const finalBodyType = Object.keys(bodyTypeCounts).reduce((a, b) => bodyTypeCounts[a] > bodyTypeCounts[b] ? a : b);

    return {
        bodyTypes,
        finalBodyType
    };

}




module.exports = { determineBodyType };