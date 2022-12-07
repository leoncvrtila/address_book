import { email, helpers, required } from '@vuelidate/validators';

export function useContactFormManager() {
  function contactRules() {
    return {
      firstName: {
        required: helpers.withMessage('First name is required', required),
      },
      lastName: {
        required: helpers.withMessage('Last name is required', required),
      },
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email is not valid', email),
      },
      country: {
        required: helpers.withMessage('Country is required', required),
      },
    };
  }

  return {
    contactRules,
  };
}
