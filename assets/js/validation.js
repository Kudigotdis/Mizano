/**
 * MIZANO VALIDATION UTILITY
 */

const MizanoValidation = {
    isValidWhatsApp: (number) => {
        // Format: +267XXXXXXXX
        const regex = /^\+267\d{8}$/;
        return regex.test(number);
    },

    calculateAge: (dobString) => {
        const birthDate = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },

    isValidEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
};

window.MizanoValidation = MizanoValidation;
