import { expect as baseExpect } from "@playwright/test";
declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      isValidPassword(): R;
      isPositiv(): R;
    }
  }
}
export const expect = baseExpect.extend({
  isValidPassword: (password: string) => {
    const isValidLength = password.length > 10 && password.length < 15;
    const textCaps = /[A-Z]/g.test(password);
    const numberInPassword = /[0-9]/g.test(password);
    const symbolInPassword = /[!^@_$&*()+-]/g.test(password);

    const isValidPassword =
      isValidLength && textCaps && numberInPassword && symbolInPassword;
    if (isValidPassword) {
      return {
        message: () => {
          return "Password is valid";
        },
        pass: true,
      };
    } else {
      return {
        message: () => {
          return "Password is not valid";
        },
        pass: false,
      };
    }
  },
  isPositiv: (number: number) => {
    const result = number > 0;
    if (result) {
      return {
        message: () => {
          return "Number is positiv";
        },
        pass: true,
      };
    } else {
      return {
        message: () => {
          return "Number is negativ";
        },
        pass: false,
      };
    }
  },
});
