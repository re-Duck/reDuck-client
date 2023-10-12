module.exports = {
  ci: {
    collect: {
      staticDistDir: './build',
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 5,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        // performance 카테고리 점수가 90점 미만이면 warning
        'categories:performance': ['warn', { minScore: 0.9 }],
        // accessibility 가 100점 미만이면 error
        'categories:accessibility': ['error', { minScore: 1 }],
      },
    },
  },
};
