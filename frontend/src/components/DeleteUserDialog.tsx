import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
  import { useDeleteUser } from '@/hooks/useUsers';
  
  interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string | null;
    userName?: string;
  }
  
  const DeleteUserDialog = ({ open, onOpenChange, userId, userName }: Props) => {
    const deleteMutation = useDeleteUser();
  
    const handleDelete = () => {
      if (!userId) return;
      deleteMutation.mutate(userId, { onSuccess: () => onOpenChange(false) });
    };
  
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will soft-delete <strong>{userName}</strong>. The record is preserved but hidden
              from active listings. This action can only be reversed via the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default DeleteUserDialog;