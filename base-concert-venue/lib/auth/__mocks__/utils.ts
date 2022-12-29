module.exports = {
  esModule: true,
  // mockResolvedValue for creating promise
  validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy TS
export {};

// mock module every test file by using this code
// by passing below mock
// it will be used the one from __mocks__ folder
// where validateToken always returns the true

// ***
// jest.mock("@/lib/auth/utils");
