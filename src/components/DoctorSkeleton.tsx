import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DoctorSkeleton() {
  return (
    <Card className="w-full rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between h-full bg-white">
      <CardHeader className="p-4 pb-0">
        <Skeleton className="aspect-square w-full rounded-2xl bg-slate-200" />
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        <Skeleton className="h-7 bg-slate-200 w-3/4 rounded" />
        <Skeleton className="h-7 bg-slate-200 w-1/3 rounded-xl" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 bg-slate-200 w-1/2 rounded" />
          <Skeleton className="h-4 bg-slate-200 w-2/3 rounded" />
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 justify-end">
        <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
      </CardFooter>
    </Card>
  );
}