// jest.config.js
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\.jsx?$': 'babel-jest', // This handles .jsx files if you have any
  },
};
