// Military-Grade Password Policy
import validator from "validator";

// Password requirements for military-grade security
const PASSWORD_REQUIREMENTS = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minSpecialChars: 2,
  noRepeatingChars: 3, // No more than 3 consecutive same chars
  noCommonPasswords: true,
  noUserInfo: true, // Can't contain username
};

// Common passwords to block (military security)
const COMMON_PASSWORDS = [
  "password",
  "password123",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "password1",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "dragon",
  "master",
  "shadow",
  "superman",
  "michael",
  "football",
  "baseball",
  "liverpool",
  "jordan",
  "military",
  "soldier",
  "army",
  "navy",
  "marine",
  "classified",
  "secret",
  "topsecret",
  "confidential",
];

// Special characters allowed
const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * Validate password against military-grade policy
 * @param {string} password - Password to validate
 * @param {string} username - Username (to check for inclusion)
 * @returns {Object} - Validation result
 */
export const validatePassword = (password, username = "") => {
  const errors = [];
  const warnings = [];

  // Check if password exists
  if (!password) {
    errors.push("Password is required");
    return { isValid: false, errors, warnings };
  }

  // Length validation
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`
    );
  }

  if (password.length > PASSWORD_REQUIREMENTS.maxLength) {
    errors.push(
      `Password must not exceed ${PASSWORD_REQUIREMENTS.maxLength} characters`
    );
  }

  // Character type validation
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (PASSWORD_REQUIREMENTS.requireNumbers && !/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (PASSWORD_REQUIREMENTS.requireSpecialChars) {
    const specialCharRegex = new RegExp(
      `[${SPECIAL_CHARS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
      "g"
    );
    const specialCharCount = (password.match(specialCharRegex) || []).length;

    if (specialCharCount === 0) {
      errors.push("Password must contain at least one special character");
    } else if (specialCharCount < PASSWORD_REQUIREMENTS.minSpecialChars) {
      errors.push(
        `Password must contain at least ${PASSWORD_REQUIREMENTS.minSpecialChars} special characters`
      );
    }
  }

  // No repeating characters
  if (PASSWORD_REQUIREMENTS.noRepeatingChars) {
    const regex = new RegExp(
      `(.)\\1{${PASSWORD_REQUIREMENTS.noRepeatingChars - 1},}`,
      "i"
    );
    if (regex.test(password)) {
      errors.push(
        `Password cannot contain more than ${
          PASSWORD_REQUIREMENTS.noRepeatingChars - 1
        } consecutive identical characters`
      );
    }
  }

  // Common password check
  if (PASSWORD_REQUIREMENTS.noCommonPasswords) {
    const lowerPassword = password.toLowerCase();
    if (COMMON_PASSWORDS.includes(lowerPassword)) {
      errors.push("Password is too common and easily guessable");
    }
  }

  // Username inclusion check
  if (PASSWORD_REQUIREMENTS.noUserInfo && username) {
    if (
      password.toLowerCase().includes(username.toLowerCase()) ||
      username.toLowerCase().includes(password.toLowerCase())
    ) {
      errors.push("Password cannot contain username or vice versa");
    }
  }

  // Sequential characters check (123456, abcdef)
  if (hasSequentialChars(password)) {
    warnings.push(
      "Password contains sequential characters - consider using more random combinations"
    );
  }

  // Dictionary word check (basic)
  if (containsDictionaryWords(password)) {
    warnings.push(
      "Password contains dictionary words - consider using more complex combinations"
    );
  }

  // Strength assessment
  const strength = calculatePasswordStrength(password);
  if (strength < 70) {
    warnings.push("Password strength could be improved");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    strength,
    requirements: PASSWORD_REQUIREMENTS,
  };
};

/**
 * Check for sequential characters
 * @param {string} password
 * @returns {boolean}
 */
function hasSequentialChars(password) {
  const sequences = [
    "0123456789",
    "abcdefghijklmnopqrstuvwxyz",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm",
  ];

  for (const seq of sequences) {
    for (let i = 0; i <= seq.length - 4; i++) {
      const subseq = seq.substring(i, i + 4);
      if (
        password.toLowerCase().includes(subseq) ||
        password.toLowerCase().includes(subseq.split("").reverse().join(""))
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check for common dictionary words
 * @param {string} password
 * @returns {boolean}
 */
function containsDictionaryWords(password) {
  const commonWords = [
    "password",
    "admin",
    "user",
    "login",
    "welcome",
    "hello",
    "world",
  ];
  const lowerPassword = password.toLowerCase();

  return commonWords.some((word) => lowerPassword.includes(word));
}

/**
 * Calculate password strength score (0-100)
 * @param {string} password
 * @returns {number}
 */
function calculatePasswordStrength(password) {
  let score = 0;

  // Length bonus
  if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else if (password.length >= 6) score += 10;

  // Character variety bonus
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  // Complexity bonus
  const uniqueChars = new Set(password.toLowerCase()).size;
  if (uniqueChars >= password.length * 0.7) score += 10;

  return Math.min(score, 100);
}

/**
 * Generate password requirements text for UI
 * @returns {Array} - Array of requirement strings
 */
export const getPasswordRequirements = () => {
  return [
    `At least ${PASSWORD_REQUIREMENTS.minLength} characters long`,
    "At least one uppercase letter (A-Z)",
    "At least one lowercase letter (a-z)",
    "At least one number (0-9)",
    `At least ${PASSWORD_REQUIREMENTS.minSpecialChars} special characters (${SPECIAL_CHARS})`,
    "Cannot contain more than 2 consecutive identical characters",
    "Cannot be a common or easily guessable password",
    "Cannot contain your username",
  ];
};

/**
 * Middleware to validate password on signup
 */
export const passwordValidationMiddleware = (req, res, next) => {
  const { password, username } = req.body;

  const validation = validatePassword(password, username);

  if (!validation.isValid) {
    return res.status(400).json({
      message: "Password does not meet security requirements",
      errors: validation.errors,
      warnings: validation.warnings,
      requirements: getPasswordRequirements(),
    });
  }

  // Add warnings to response if any
  if (validation.warnings.length > 0) {
    req.passwordWarnings = validation.warnings;
  }

  next();
};
