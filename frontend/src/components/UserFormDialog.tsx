import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { userFormSchema } from '@/schemas/user.schema';
import type { UserFormValues } from '@/schemas/user.schema';
import { useCreateUser, useUpdateUser } from '@/hooks/useUsers';
import type { User } from '@/types/user.types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

const UserFormDialog = ({ open, onOpenChange, user }: Props) => {
  const isEdit = !!user;
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        primaryMobile: user.primaryMobile,
        secondaryMobile: user.secondaryMobile || '',
        aadhaar: user.aadhaar,
        pan: user.pan,
        dateOfBirth: user.dateOfBirth.split('T')[0],
        placeOfBirth: user.placeOfBirth,
        currentAddress: user.currentAddress,
        permanentAddress: user.permanentAddress,
      });
    } else {
      reset({
        name: '', email: '', primaryMobile: '', secondaryMobile: '',
        aadhaar: '', pan: '', dateOfBirth: '', placeOfBirth: '',
        currentAddress: '', permanentAddress: '',
      });
    }
  }, [user, open, reset]);

  const onSubmit = (values: UserFormValues) => {
    const payload = { ...values, secondaryMobile: values.secondaryMobile || null };
    if (isEdit && user) {
      updateMutation.mutate(
        { id: user.id, payload },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createMutation.mutate(payload as any, { onSuccess: () => onOpenChange(false) });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const Field = ({ name, label, type = 'text' }: { name: keyof UserFormValues; label: string; type?: string }) => (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} {...register(name)} />
      {errors[name] && <p className="text-xs text-destructive">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field name="name" label="Full Name" />
            <Field name="email" label="Email" type="email" />
            <Field name="primaryMobile" label="Primary Mobile" />
            <Field name="secondaryMobile" label="Secondary Mobile (Optional)" />
            <Field name="aadhaar" label="Aadhaar Number" />
            <Field name="pan" label="PAN Number" />
            <Field name="dateOfBirth" label="Date of Birth" type="date" />
            <Field name="placeOfBirth" label="Place of Birth" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="currentAddress">Current Address</Label>
            <Textarea id="currentAddress" {...register('currentAddress')} rows={2} />
            {errors.currentAddress && (
              <p className="text-xs text-destructive">{errors.currentAddress.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Textarea id="permanentAddress" {...register('permanentAddress')} rows={2} />
            {errors.permanentAddress && (
              <p className="text-xs text-destructive">{errors.permanentAddress.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;