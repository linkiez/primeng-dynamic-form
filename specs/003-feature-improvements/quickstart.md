# Quickstart: New Features and Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Created**: 2026-05-09

## 1. Install dependencies
```
npm install @linkiez/primeng-dynamic-form primeng
```

## 2. Import the module
```
import { DynamicFormModule } from '@linkiez/primeng-dynamic-form';
```

## 3. Use new field types in your schema
```ts
const schema = [
  { id: 'file', type: 'file', label: 'Upload File' },
  { id: 'daterange', type: 'date-range', label: 'Date Range' },
  { id: 'custom', type: 'custom', label: 'Custom Widget' }
];
```

## 4. Register event hooks
```ts
<pm-dynamic-form
  [schema]="schema"
  (beforeSubmit)="onBeforeSubmit($event)"
  (afterReset)="onAfterReset()"
></pm-dynamic-form>
```

## 5. Enable i18n and accessibility
- Provide translation maps for all user-facing text
- Test with screen readers and keyboard navigation

## 6. Run tests and validate
```
npm run test
npm run lint
```

## 7. Build and use in your app
```
npm run build
```
