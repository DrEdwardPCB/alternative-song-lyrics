import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../../lib/supabaseClient';
import { EditSongDialog } from '../../components/EditSongDialog';
import type { Song } from '../../types/Song';
import { useNavigate } from 'react-router-dom';
import path from 'path'
import {BASE_URL} from '../../constant'

async function fetchAllSongs(): Promise<Song[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('createdAt', { ascending: false });
  
  if (error) throw error;
  return data;
}

async function deleteSong(id: string) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editSongId, setEditSongId] = useState<string | null>(null);

  // Check authentication on mount and redirect if not logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate(path.join(BASE_URL, "/"));
      }
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate(path.join(BASE_URL, "/"));
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: songs = [], isLoading } = useQuery<Song[]>({
    queryKey: ['admin-songs'],
    queryFn: fetchAllSongs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-songs'] });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate(path.join(BASE_URL, "/"));
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'originalSongName', headerName: 'Original Song', flex: 1 },
    { field: 'alternativeSongName', headerName: 'Alternative Song', flex: 1 },
    { field: 'originalSongSinger', headerName: 'Original Singer', flex: 1 },
    { field: 'alternativeSongSinger', headerName: 'Alternative Singer', flex: 1 },
    { field: 'originalSongAuthor', headerName: 'Original Author', flex: 1 },
    { 
      field: 'originalSongYoutubeLink', 
      headerName: 'Original Video',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Song>) => params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-900"
          onClick={(e) => e.stopPropagation()}
        >
          Watch ↗
        </a>
      ) : null,
    },
    { 
      field: 'alternativeSongYoutubeLink',
      headerName: 'Alternative Video',
      flex: 1,
      renderCell: (params: GridRenderCellParams<Song>) => params.value ? (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-900"
          onClick={(e) => e.stopPropagation()}
        >
          Watch ↗
        </a>
      ) : null,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => setEditSongId(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => setDeleteConfirmId(params.id as string)}
        />,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Song Management
          </h1>
          <div className="flex gap-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditSongId('new')}
            >
              Add New Song
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <DataGrid
            rows={songs}
            columns={columns}
            loading={isLoading}
            autoHeight
            getRowId={(row: Song) => row.id}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            pageSizeOptions={[25, 50, 100]}
            sx={{
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f3f4f6',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f9fafb',
                borderBottom: '2px solid #e5e7eb',
              },
            }}
          />
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this song? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
            <Button
              onClick={() => {
                if (deleteConfirmId) {
                  deleteMutation.mutate(deleteConfirmId);
                  setDeleteConfirmId(null);
                }
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        {editSongId && (
          <EditSongDialog
            songId={editSongId}
            onClose={() => setEditSongId(null)}
            onSave={() => {
              queryClient.invalidateQueries({ queryKey: ['admin-songs'] });
              setEditSongId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
