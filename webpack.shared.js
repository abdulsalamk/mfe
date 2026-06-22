const shared = {
  react: { singleton: true, requiredVersion: false, eager: false },
  'react-dom': { singleton: true, requiredVersion: false, eager: false },
  'react/jsx-runtime': { singleton: true, requiredVersion: false, eager: false },
  'react/jsx-dev-runtime': { singleton: true, requiredVersion: false, eager: false },
};

const hostShared = Object.fromEntries(
  Object.entries(shared).map(([key, value]) => [key, { ...value, eager: true }])
);

module.exports = { shared, hostShared };
