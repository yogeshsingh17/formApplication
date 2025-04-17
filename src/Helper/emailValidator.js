function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regex.test(email)) {
      return {
        isValid: true,
        message: "Valid email address."
      };
    } else {
      return {
        isValid: false,
        message: "Please enter a valid email address."
      };
    }
  }
  
  export default validateEmail;
  