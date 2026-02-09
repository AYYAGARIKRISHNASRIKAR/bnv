export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

export const validateUserForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!validateRequired(formData.gender)) {
    errors.gender = 'Gender is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};