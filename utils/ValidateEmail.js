export const ValidateEmail = (email) => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(email)
        return emailRegex.test(email);
    } catch (error) {
        console.error(error);
        return false; 
    }
  }; 