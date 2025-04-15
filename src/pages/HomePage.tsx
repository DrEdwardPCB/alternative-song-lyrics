import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import { SearchBar } from '../components/SearchBar';
import { AdSense } from '../components/AdSense';
import { fetchSongs } from '../api/songs';
import type { SearchParams, Song } from '../types/Song';
import { Link } from 'react-router-dom';
import path from 'path'
import {BASE_URL} from '../constant'
const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

const columns: GridColDef[] = [
  {
    field: 'originalSongName',
    headerName: 'Original Song',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'alternativeSongName',
    headerName: 'Alternative Song',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'originalSongSinger',
    headerName: 'Original Singer',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'alternativeSongSinger',
    headerName: 'Alternative Singer',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'originalSongYoutubeLink',
    headerName: 'Original Video',
    flex: 1,
    minWidth: 120,
    renderCell: (params: GridRenderCellParams<Song, string>) => params.value ? (
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
    minWidth: 120,
    renderCell: (params: GridRenderCellParams<Song, string>) => params.value ? (
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
];

export function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    originalSongName: '',
    alternativeSongName: '',
    originalSongSinger: '',
    alternativeSongSinger: ''
  })
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const { data, isLoading, error } = useQuery<{total:number,songs:Song[]}>({
    queryKey: ['songs', searchParams, paginationModel, sortModel],
    queryFn: () => fetchSongs(searchParams,paginationModel,sortModel),
  });
  console.log(data)
  return (
    <div className="min-h-screen bg-gray-50 py-8 w-[100vw]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          Alternative Song Lyrics
        </h1>

        {/* Top Ad */}
        <div className="mb-8">
          <AdSense
            client={adsenseClientId}
            slot="YOUR-SLOT-ID"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <SearchBar
            label="Original Song Name"
            field="originalSongName"
            value={searchParams.originalSongName??""}
            onChange={(value) => setSearchParams(prev => ({ ...prev, originalSongName: value }))}
            placeholder="Search by original song name..."
            onCancel={() => setSearchParams(prev => ({ ...prev, originalSongName: '' }))}
          />
          <SearchBar
            label="Alternative Song Name"
            field="alternativeSongName"
            value={searchParams.alternativeSongName??""}
            onChange={(value) => setSearchParams(prev => ({ ...prev, alternativeSongName: value }))}
            placeholder="Search by alternative song name..."
            onCancel={() => setSearchParams(prev => ({ ...prev, alternativeSongName: '' }))}
          />
          <SearchBar
            label="Original Singer"
            field="originalSongSinger"
            value={searchParams.originalSongSinger??""}
            onChange={(value) => setSearchParams(prev => ({ ...prev, originalSongSinger: value }))}
            placeholder="Search by original singer..."
            onCancel={() => setSearchParams(prev => ({ ...prev, originalSongSinger: '' }))}
          />
          <SearchBar
            label="Alternative Singer"
            field="alternativeSongSinger"
            value={searchParams.alternativeSongSinger??""}
            onChange={(value) => setSearchParams(prev => ({ ...prev, alternativeSongSinger: value }))}
            placeholder="Search by alternative singer..."
            onCancel={() => setSearchParams(prev => ({ ...prev, alternativeSongSinger: '' }))}
          />
        </div>

        {error ? (
          <div className="mb-4 text-center text-red-600">
            Error loading songs. Please try again.
          </div>
        ) : (
          <div className="mb-8 overflow-hidden bg-white rounded-lg shadow">
            <DataGrid<Song>
              rowCount={data?.total??0}
              rows={data?.songs??[]}
              columns={columns}
              loading={isLoading}
              autoHeight
              getRowId={(row: Song) => row.id}
              onRowClick={(params) => navigate(path.join(BASE_URL, "/song", params.id.toString()))}
              onSortModelChange={setSortModel}
              onPaginationModelChange={setPaginationModel}
              paginationModel={paginationModel}
              sortModel={sortModel}
              pageSizeOptions={[10,30,50,100]}
              disableColumnFilter
              pagination
              paginationMode="server"
              sortingMode="server"
              sx={{
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f9fafb',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f9fafb',
                  borderBottom: '2px solid #e5e7eb',
                },
              }}
            />
          </div>
        )}

        {/* Bottom Ad */}
        <div className="mt-8 mb-8">
          <AdSense
            client={adsenseClientId}
            slot="YOUR-SLOT-ID-2"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        {/* Footer */}
        <footer className="pt-8 mt-12 border-t border-gray-200">
          <div className="flex justify-center space-x-8">
            <Link
              to="/about"
              className="text-slate-600 hover:text-slate-900"
            >
              About Us
            </Link>
            <Link
              to="/privacy"
              className="text-slate-600 hover:text-slate-900"
            >
              Privacy Policy
            </Link>
            <Link
              to="/auth"
              className="text-slate-600 hover:text-slate-900"
            >
              Management
            </Link>
          </div>
          <p className="mt-4 text-sm text-center text-slate-500">
            {new Date().getFullYear()} Alternative Song Lyrics. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
