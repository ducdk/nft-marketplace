const regexes = {
  email:
    /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  phone: /^\+[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/,
  phoneNotArea: /^[(]?[0-9]{2}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/,
  otp: /[0-9]{6}/,
  username: /^[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]{4,20}$/
};

const Validate = {
  validateEmail: (email: any) => ({
    validator(rule: any, value: any) {
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.email.test(value)) {
        return Promise.reject('Email is not valid!');
      } else if (email === value) {
        return Promise.reject('New email has no change!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  validatePhone: (phone: any) => ({
    validator(rule: any, value: any) {
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.phone.test(value)) {
        return Promise.reject('Phone is not valid!');
      } else if (phone === value) {
        return Promise.reject('New phone has no change!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  validatePhoneNotArea: (area: number, phone: any) => ({
    validator(rule: any, value: any) {
      const newPhone = `+${area}${value.startsWith('0') ? value.substring(1) : value}`;
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.phoneNotArea.test(value)) {
        return Promise.reject('Phone is not valid!');
      } else if (phone === newPhone) {
        return Promise.reject('New phone has no change!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  validatePassword: () => ({
    validator(rule: any, value: any) {
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.password.test(value)) {
        return Promise.reject('Password is not valid!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  validateOtp: () => ({
    validator(rule: any, value: any) {
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.otp.test(value)) {
        return Promise.reject('Otp code is not valid!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  validateUsername: () => ({
    validator(rule: any, value: any) {
      if (value === undefined || value.length === 0) {
        return Promise.reject('This field is required!');
      } else if (!regexes.username.test(value)) {
        return Promise.reject('Username is not valid!');
      } else {
        return Promise.resolve();
      }
    }
  }),
  confirmPassword: ({ getFieldValue }: any) => ({
    validator(rule: any, value: any) {
      if (value === getFieldValue('password')) {
        return Promise.resolve();
      }

      return Promise.reject('Password do not match');
    }
  })
};

export { Validate, regexes };
