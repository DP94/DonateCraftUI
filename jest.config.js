module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
      '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    }
  };