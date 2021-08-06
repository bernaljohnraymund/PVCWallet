function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const OTP = {
    generateOtp () {
        let otp = '';
        const numbers       = "0123456789";
        for (let i = 0; i < 6; i++) {
            let rand = getRandomArbitrary(0, numbers.length);
            otp += numbers[parseInt(rand)];
        }
        return otp;
    }
}

module.exports = OTP;