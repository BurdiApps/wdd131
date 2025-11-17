// Get current year for footer
function getCurrentYear() {
    return new Date().getFullYear();
}

// Get last modified date
function getLastModified() {
    return document.lastModified;
}

// Calculate wind chill
function calculateWindChill(temp, windSpeed) {
    // Using metric formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
    // Where T = temperature in Celsius, V = wind speed in km/h
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Update footer with current year and last modified date
document.getElementById('currentyear').textContent = getCurrentYear();
document.getElementById('lastModified').textContent = `Last Modified: ${getLastModified()}`;

// Calculate and display wind chill
const temp = parseFloat(document.getElementById('temp').textContent);
const windSpeed = parseFloat(document.getElementById('wind').textContent);

// Conditions: temp <= 10°C AND wind > 4.8 km/h
if (temp <= 10 && windSpeed > 4.8) {
    const windChillValue = calculateWindChill(temp, windSpeed);
    document.getElementById('windchill').textContent = `${windChillValue}°C`;
} else {
    document.getElementById('windchill').textContent = 'N/A';
}
