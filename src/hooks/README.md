
# SISO Hooks

This directory contains all the custom React hooks used throughout the SISO application.

## Core Hooks

The essential hooks for the application are exported from the `core` directory. These include:

- Authentication hooks
- User data hooks
- UI utility hooks
- Chat and messaging hooks
- Project and planning hooks

## Usage

Import hooks from the core directory:

```jsx
import { useAuthSession, useBasicUserData } from '@/hooks/core';

function MyComponent() {
  const { user } = useAuthSession();
  const { userData } = useBasicUserData();
  
  // Use the hooks...
}
```

## Structure

- `core/index.ts` - Exports all core hooks
- Individual hook files in the root hooks directory

The current structure allows for backward compatibility while we transition to a more organized approach.
