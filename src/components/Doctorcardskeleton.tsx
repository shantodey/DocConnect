import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DoctorCardSkeleton() {
  return (
    <Card className="w-full rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white p-3 flex flex-col h-full">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full rounded-2xl" />
      </CardHeader>
      <CardContent className="p-0 pt-4 flex-grow flex flex-col">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-20 rounded-lg mt-2" />
        <div className="space-y-2 mt-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-full rounded-full mt-4" />
      </CardContent>
    </Card>
  );
}