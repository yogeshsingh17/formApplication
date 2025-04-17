function validatePassword(str) {
    
    const regex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (regex.test(str)) {
      return {
        isValid: true,
        message: "Valid string."
      };
    } else {
      return {
        isValid: false,
        message: "String must be at least 8 characters long, contain at least one number, and one special character."
      };
    }
  }

export default validatePassword;