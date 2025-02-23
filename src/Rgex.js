export const regexPatterns = {
  alphanumeric: /^[A-Za-z0-9]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  panCard: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  bankAccount: /^[0-9]{9,18}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  phoneGeneric: /^\+?[1-9]\d{1,14}$/,
  phoneIndian: /^[6-9]\d{9}$/,
  strongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  ssn: /^\d{3}-\d{2}-\d{4}$/,
  ipv4: /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/,
};
