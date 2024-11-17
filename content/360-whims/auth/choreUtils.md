---
title: "Chore Utils Documentation"
description: "Utility methods for handling chores"
---

### Description

This module provides utility functions for handling date/time calculations.

### Dependencies

- **dayjs**: A lightweight date manipulation library.

### Functions

#### `getElapsedMins`

```typescript
export const getElapsedMins = (startTime: number | null, endTime: number) => {
```

- **Parameters**:

  - `startTime` (number | null): The start time in milliseconds since the Unix epoch. Can be `null`.
  - `endTime` (number): The end time in milliseconds since the Unix epoch.

- **Returns**:

  - The absolute difference in minutes between `startTime` and `endTime`.

- **Usage**: This function is used to calculate the elapsed minutes between two timestamps.
