import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../utils";

const Chart = React.forwardRef<
  React.ElementRef<typeof RechartsPrimitive.ResponsiveContainer>,
  React.ComponentPropsWithoutRef<typeof RechartsPrimitive.ResponsiveContainer>
>(({ className, ...props }, ref) => (
  <RechartsPrimitive.ResponsiveContainer
    ref={ref}
    className={cn("h-[350px]", className)}
    {...props}
  />
));
Chart.displayName = "Chart";

export { Chart };
