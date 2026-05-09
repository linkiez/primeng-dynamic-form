# Release Evidence - 003 Feature Improvements

Date: 2026-05-09
Package: @linkiez/primeng-dynamic-form
Published Version: 0.1.1

## Scope Included

- New field types: file, date-range, custom
- New lifecycle outputs: beforeSubmit, afterReset
- i18n support with locale, fallbackLocale and translations map
- Accessibility improvements with aria-describedby, live error region and field description semantics

## Migration Guide (0.1.0 -> 0.1.1)

Breaking changes: none.

Recommended updates for consumers:

1. If needed, configure i18n through DynamicFormConfiguration:
   - locale
   - fallbackLocale
   - translations
2. Optionally subscribe to new outputs:
   - beforeSubmit
   - afterReset
3. You can now use new field types in schema:
   - file
   - date-range
   - custom

## Validation Evidence

### Functional and Contract Gates

- Unit tests: pass (43/43)
- Integration tests: pass (44/44)
- Contract tests: pass (42/42)
- Lint: pass
- Build: pass

### Accessibility Validation (T019)

Lighthouse report:
- File: specs/003-feature-improvements/lighthouse-accessibility.json
- Accessibility score: 94
- Failing checks: color-contrast, landmark-one-main

Axe report:
- File: specs/003-feature-improvements/axe-report.json
- Violations: 4
- Incomplete checks: 1
- Violations by rule:
  - color-contrast: 58 nodes
  - landmark-one-main: 1 node
  - region: 9 nodes
  - scrollable-region-focusable: 1 node

## Known Follow-ups

- Improve visual contrast in demo typography and code blocks
- Ensure a main landmark wraps the primary content
- Wrap remaining content sections in landmark regions
- Make scrollable code blocks keyboard-focusable where required

## Publish Evidence

- npm publish executed successfully for @linkiez/primeng-dynamic-form@0.1.1
- Dist package generated from dist/@linkiez/primeng-dynamic-form
