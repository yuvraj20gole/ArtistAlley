# ChatBot Revert Instructions

If you want to remove the ChatBot feature, follow these simple steps:

## Step 1: Delete ChatBot Component
Delete the file:
```
frontend/src/components/ChatBot.tsx
```

## Step 2: Remove from BuyerDashboard
In `frontend/src/components/BuyerDashboard.tsx`:

### Remove Import (Line 12):
```typescript
import { ChatBot } from "./ChatBot";  // DELETE THIS LINE
```

### Remove Component (Lines 244-245):
```typescript
{/* ChatBot Widget */}
<ChatBot />  // DELETE THESE TWO LINES
```

## That's it! The chatbot will be completely removed.

---

## Files Modified:
1. `frontend/src/components/ChatBot.tsx` (NEW - can be deleted)
2. `frontend/src/components/BuyerDashboard.tsx` (2 lines added - can be removed)

Date: October 7, 2025

