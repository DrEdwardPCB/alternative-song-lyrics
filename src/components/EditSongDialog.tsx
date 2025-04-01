import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { songSchema, type Song, type SongFormData } from '../types/Song';
import { fetchSongById } from '../api/songs';
import { createSong, updateSong } from '../api/songs';



interface EditSongDialogProps {
  songId: string;
  onClose: () => void;
  onSave: () => void;
}



export function EditSongDialog({ songId, onClose, onSave }: EditSongDialogProps) {
  const isNew = songId === 'new';
  const queryClient = useQueryClient();

  const { data: song, isLoading: isLoadingSong } = useQuery<Song>({
    queryKey: ['song', songId],
    queryFn: () => fetchSongById(songId),
    enabled: !isNew,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: isNew ? {
      originalSongName: '',
      alternativeSongName: '',
      originalSongSinger: '',
      alternativeSongSinger: '',
      originalSongYoutubeLink: '',
      alternativeSongYoutubeLink: '',
      originalSongAuthor: '',
      alternativeSongLyricsFiller: '',
      originalSongLyricsFiller: '',
      originalSongLyrics: '',
      alternativeSongLyrics: '',
    } : undefined,
  });

  useEffect(() => {
    if (song) {
      reset({
        originalSongName: song?.originalSongName??"",
        alternativeSongName: song?.alternativeSongName??"",
        originalSongSinger: song?.originalSongSinger??"",
        alternativeSongSinger: song?.alternativeSongSinger??"",
        originalSongYoutubeLink: song?.originalSongYoutubeLink??"",
        alternativeSongYoutubeLink: song?.alternativeSongYoutubeLink??"",
        originalSongAuthor: song?.originalSongAuthor??"",
        alternativeSongLyricsFiller: song?.alternativeSongLyricsFiller??"",
        originalSongLyricsFiller: song?.originalSongLyricsFiller??"",
        originalSongLyrics: song?.originalSongLyrics??"",
        alternativeSongLyrics: song?.alternativeSongLyrics??"",
      });
    }
  }, [song, reset]);

  const mutation = useMutation({
    mutationFn: async (data: SongFormData) => {
      if (isNew) {
        await createSong(data);
      } else {
        await updateSong(songId, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-songs'] });
      onSave();
    },
  });

  const onSubmit = (data: SongFormData) => {
    mutation.mutate(data);
  };

  if (!isNew && isLoadingSong) {
    return null;
  }

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{isNew ? 'Add New Song' : 'Edit Song'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Alternative Song Name"
              {...register('alternativeSongName')}
              error={!!errors.alternativeSongName}
              helperText={errors.alternativeSongName?.message}
              fullWidth
            />
            <TextField
              label="Alternative Singer"
              {...register('alternativeSongSinger')}
              error={!!errors.alternativeSongSinger}
              helperText={errors.alternativeSongSinger?.message}
              fullWidth
            />
            <TextField
              label="Original Song Name"
              {...register('originalSongName')}
              error={!!errors.originalSongName}
              helperText={errors.originalSongName?.message}
              fullWidth
            />
            <TextField
              label="Alternative Filler"
              {...register('alternativeSongLyricsFiller')}
              error={!!errors.alternativeSongLyricsFiller}
              helperText={errors.alternativeSongLyricsFiller?.message}
              fullWidth
            />
            <TextField
            label="Alternative Lyrics"
            {...register('alternativeSongLyrics')}
            error={!!errors.alternativeSongLyrics}
            helperText={errors.alternativeSongLyrics?.message}
            multiline
            rows={4}
            fullWidth
          />
            <TextField
              label="Alternative YouTube Link"
              {...register('alternativeSongYoutubeLink')}
              error={!!errors.alternativeSongYoutubeLink}
              helperText={errors.alternativeSongYoutubeLink?.message}
              fullWidth
            />
            <TextField
              label="Original Singer"
              {...register('originalSongSinger')}
              error={!!errors.originalSongSinger}
              helperText={errors.originalSongSinger?.message}
              fullWidth
            />
            <TextField
              label="Original Filler"
              {...register('originalSongLyricsFiller')}
              error={!!errors.originalSongLyricsFiller}
              helperText={errors.originalSongLyricsFiller?.message}
              fullWidth
            />
            
            <TextField
              label="Original YouTube Link"
              {...register('originalSongYoutubeLink')}
              error={!!errors.originalSongYoutubeLink}
              helperText={errors.originalSongYoutubeLink?.message}
              fullWidth
            />
            
            <TextField
              label="Original Author"
              {...register('originalSongAuthor')}
              error={!!errors.originalSongAuthor}
              helperText={errors.originalSongAuthor?.message}
              fullWidth
            />
            <TextField
              label="Original Lyrics"
              {...register('originalSongLyrics')}
              error={!!errors.originalSongLyrics}
              helperText={errors.originalSongLyrics?.message}
              multiline
              rows={4}
              fullWidth
            />
            
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            {isNew ? 'Create' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
