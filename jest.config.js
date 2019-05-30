module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.*\\.(vue|js)$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    'node_modules/(?!vue-router)'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ]
};
