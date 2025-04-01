import { z } from 'zod';
export interface Song {
  id: string;
  originalSongYoutubeLink?: string;
  originalSongName?: string;
  originalSongSinger?: string;
  originalSongLyricsFiller?: string;
  originalSongLyrics?: string;
  originalSongAuthor?: string;
  alternativeSongYoutubeLink?: string;
  alternativeSongName?: string;
  alternativeSongSinger?: string;
  alternativeSongLyricsFiller?: string;
  alternativeSongLyrics?: string;
  createdAt: string;
  updatedAt: string;
}

export const searchParamsSchema = z.object({
  originalSongName: z.string().optional(),
  alternativeSongName: z.string().optional(),
  originalSongSinger: z.string().optional(),
  alternativeSongSinger: z.string().optional(),
});

export const songSchema = z.object({
  originalSongName: z.string().min(1, 'Original song name is required'),
  alternativeSongName: z.string().min(1, 'Alternative song name is required'),
  originalSongSinger: z.string().min(1, 'Original singer is required'),
  alternativeSongSinger: z.string().min(1, 'Alternative singer is required'),
  originalSongYoutubeLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  alternativeSongYoutubeLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  originalSongAuthor: z.string().optional(),
  alternativeSongLyricsFiller: z.string().optional(),
  originalSongLyricsFiller: z.string().optional(),
  originalSongLyrics: z.string().optional(),
  alternativeSongLyrics: z.string().optional(),
});

export type SongFormData = z.infer<typeof songSchema>;

export type SearchParams = z.infer<typeof searchParamsSchema>;
