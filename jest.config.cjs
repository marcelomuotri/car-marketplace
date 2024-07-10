// jest.config.cjs o jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Esto le dice a Jest que use babel-jest para todos los archivos JavaScript y JSX
  },
  testEnvironment: 'jest-environment-jsdom',
}
