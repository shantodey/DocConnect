

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaTrashCan, FaSpinner } from "react-icons/fa6"; 
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteMyServicesProps {
    serviceId: string;
    userId: string;
    onDeleteSuccess: (id: string) => void;
    deleteAction: (serviceId: string, userId: string) => Promise<{ success: boolean; message?: string } | any>;
}

const DeleteMyServices = ({ serviceId, userId, onDeleteSuccess, deleteAction }: DeleteMyServicesProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        if (!serviceId || !userId) return;
        
        setIsDeleting(true);
        try {
            const response = await deleteAction(serviceId, userId);
            
            if (response?.success) {
                toast.success("Service deleted successfully!");
                onDeleteSuccess(serviceId); 
                setIsOpen(false);
            } else {
                toast.error(response?.message || "Failed to delete service.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger render={<button
                    type="button"
                    className="w-10 h-10 rounded-full border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shrink-0"
                    aria-label="Delete service"
                >
                    <FaTrashCan className="h-4 w-4" />
                </button>}>
                
            </AlertDialogTrigger>
            
            <AlertDialogContent className="bg-white rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 font-bold">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 text-sm">
                        This action cannot be undone. This will permanently delete your medical service listing from our platform.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel render={ <button  disabled={isDeleting} className="rounded-xl">
                            Cancel
                        </button>}>
                       
                    </AlertDialogCancel>
                    <Button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-xl gap-2 font-semibold"
                    >
                        {isDeleting ? (
                            <>
                                <FaSpinner className="h-3.5 w-3.5 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Yes, Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteMyServices;