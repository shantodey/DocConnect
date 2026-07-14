import { cn } from "@/lib/utils";
import { RiLoader5Fill } from "react-icons/ri";

export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <RiLoader5Fill  role="status"  aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props}/>
    );
}