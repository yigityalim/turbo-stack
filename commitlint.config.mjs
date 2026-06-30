/**
 * Conventional Commits enforcement. Commit messages are always English.
 * Wired through lefthook's commit-msg hook.
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-case": [2, "always", "kebab-case"],
    "subject-case": [0],
    "body-max-line-length": [0],
  },
};
