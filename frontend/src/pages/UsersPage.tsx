import { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Search, ArrowUpDown, Users as UsersIcon } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import UserFormDialog from '@/components/UserFormDialog';
import DeleteUserDialog from '@/components/DeleteUserDialog';
import { User } from '@/types/user.types';

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const limit = 10;
  const { data, isLoading } = useUsers({ page, limit, search, sortBy, sortOrder });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const toggleSort = (field: 'name' | 'email' | 'createdAt') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const openAddDialog = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  };

  const SortHeader = ({ field, label }: { field: 'name' | 'email' | 'createdAt'; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 font-medium hover:text-foreground"
    >
      {label} <ArrowUpDown size={13} className={sortBy === field ? 'text-primary' : 'text-muted-foreground'} />
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-muted-foreground">Manage all registered users</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus size={16} className="mr-2" /> Add User
        </Button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4 max-w-sm">
        <Input
          placeholder="Search by name or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button type="submit" variant="secondary">
          <Search size={16} />
        </Button>
      </form>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><SortHeader field="name" label="Name" /></TableHead>
              <TableHead><SortHeader field="email" label="Email" /></TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>PAN</TableHead>
              <TableHead><SortHeader field="createdAt" label="Created" /></TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && data?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UsersIcon size={32} />
                    <p className="font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your search or add a new user.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              data?.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.primaryMobile}</TableCell>
                  <TableCell><Badge variant="outline">{user.pan}</Badge></TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(user)}>
                      <Pencil size={15} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openDeleteDialog(user)}>
                      <Trash2 size={15} className="text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline" size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline" size="sm"
              disabled={page === data.pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <UserFormDialog open={formOpen} onOpenChange={setFormOpen} user={editingUser} />
      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        userId={deletingUser?.id || null}
        userName={deletingUser?.name}
      />
    </div>
  );
};

export default UsersPage;