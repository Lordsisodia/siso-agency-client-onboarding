
import React, { useState } from 'react';
import { ProtectedAdminRoute } from '@/components/auth/ProtectedAdminRoute';
import { useClientsData } from '@/hooks/admin/useClientsData';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Search,
  Filter,
  RefreshCw,
  ArrowUpDown, 
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ClientSort, SortDirection } from '@/types/admin';

export default function Admin() {
  const { 
    clients, 
    loading, 
    error, 
    sortBy, 
    sortDirection, 
    setSortBy, 
    setSortDirection, 
    setFilters,
    fetchClients
  } = useClientsData();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  const handleSort = (column: ClientSort) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const renderSortIndicator = (column: ClientSort) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ? 
      <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500" /> : 
      <ArrowUpDown className="ml-2 h-4 w-4 text-blue-500 rotate-180" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage clients and projects</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
            <CardDescription>View and manage all your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <form onSubmit={handleSearch} className="flex-1 flex">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="ml-2">Search</Button>
              </form>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      All Statuses
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" onClick={() => fetchClients()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {error ? (
              <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
                Error loading clients: {error}
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          Name {renderSortIndicator('name')}
                        </div>
                      </TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('updated_at')}>
                        <div className="flex items-center">
                          Last Updated {renderSortIndicator('updated_at')}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="h-6 w-[200px]" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-[150px]" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-[120px]" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-[100px] ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : clients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No clients found. Add a new client to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.company || '-'}</TableCell>
                          <TableCell>{client.industry || '-'}</TableCell>
                          <TableCell>{getStatusBadge(client.status)}</TableCell>
                          <TableCell>{new Date(client.updated_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {clients.length} clients
            </p>
            {/* Pagination can be added here later */}
          </CardFooter>
        </Card>
      </div>
    </ProtectedAdminRoute>
  );
}
