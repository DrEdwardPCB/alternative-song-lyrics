import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import { AdSense } from '../components/AdSense';
import type { Song } from '../types/Song';
import { Accordion, AccordionSummary } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

async function fetchSongById(id: string): Promise<Song> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Song not found');
  
  return data;
}

export function DetailedSongPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: song, isLoading, error } = useQuery<Song>({
    queryKey: ['song', id],
    queryFn: () => fetchSongById(id!),
    enabled: !!id,
  });
  return (
    <div className="min-h-screen bg-gray-50 py-8 w-[100vw] text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-indigo-600 hover:text-indigo-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>

        {/* Top Ad */}
        <div className="mb-8">
          <AdSense
            client={adsenseClientId}
            slot="YOUR-SLOT-ID-3"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        {isLoading ? (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : error || !song ? (
          <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <div className="bg-white shadow rounded-lg p-6">
                <div className="text-red-600">Error loading song details</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
      
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Original Version</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500">Song Name</label>
                  <div className="mt-1 text-lg">{song.originalSongName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500">Singer</label>
                  <div className="mt-1 text-lg">{song.originalSongSinger}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500">Author</label>
                  <div className="mt-1 text-lg">{song.originalSongAuthor}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500">Filler</label>
                  <div className="mt-1 text-lg">{song.originalSongLyricsFiller}</div>
                </div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography component="span">Original Lyrics and Links</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <div>
                    {song.originalSongYoutubeLink && (
                      <div>
                        <label className="block text-sm font-medium text-slate-500">YouTube Link</label>
                        <a
                          href={song.originalSongYoutubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center text-indigo-600 hover:text-indigo-900"
                          >
                          Watch Video
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                    {song.originalSongLyrics&&(
                      <div>
                        <label className="block text-sm font-medium text-slate-500">Original Lyrics</label>
                        <div className="mt-1 text-sm">{song.originalSongLyrics.split('\n').map((line, index) => {
                          if(line===""){
                            return <br key={index} className='mb-4'/>;
                          }
                          return <p key={index}>{line}</p>;
                        })}</div>
                      </div>
                    )}
                  </div>
                  </AccordionDetails>
                </Accordion>

              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Alternative Version</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500">Song Name</label>
                  <div className="mt-1 text-lg">{song.alternativeSongName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500">Singer</label>
                  <div className="mt-1 text-lg">{song.alternativeSongSinger}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500">Filler</label>
                  <div className="mt-1 text-lg">{song.alternativeSongLyricsFiller}</div>
                </div>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography component="span">Alternative Lyrics and Links</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <div>
                {song.alternativeSongYoutubeLink && (
                  <div>
                    <label className="block text-sm font-medium text-slate-500">YouTube Link</label>
                    <a
                      href={song.alternativeSongYoutubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center text-indigo-600 hover:text-indigo-900"
                    >
                      Watch Video
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
                {song.alternativeSongLyrics&&(
                  <div>
                    <label className="block text-sm font-medium text-slate-500">Alternative Lyrics</label>
                    <div className="mt-1 text-sm">{song.alternativeSongLyrics.split('\n').map((line, index) =>  {if(line===""){
                            return <br key={index} className='mb-4'/>;
                          }
                          return <p key={index}>{line}</p>;})}</div>
                  </div>
                )}
                </div>
                  </AccordionDetails>
                </Accordion>
                
              </div>
            </div>
          </div>
        )}

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdSense
            client={adsenseClientId}
            slot="YOUR-SLOT-ID-4"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>
      </div>
    </div>
  );
}
