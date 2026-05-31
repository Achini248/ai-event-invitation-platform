export const validateName = (v) => {
  if (!v?.trim()) return 'Name is required';
  if (v.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validateEmail = (v) => {
  if (!v?.trim()) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v.trim())) return 'Enter a valid email address';
  return null;
};

export const validateInterest = (v) => {
  if (!v?.trim()) return 'Professional focus is required';
  if (v.trim().length < 10) return 'Please be more specific (min 10 characters)';
  return null;
};

export const validateForm = ({ name, email, interest }) => ({
  name: validateName(name),
  email: validateEmail(email),
  interest: validateInterest(interest),
});

export const hasErrors = (errs) => Object.values(errs).some(Boolean);
