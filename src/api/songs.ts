import { SearchParams, Song, SongFormData } from '../types/Song';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function fetchSuggestions(field: keyof Song, value: string): Promise<string[]> {
  if(value.length<1){
    const { data, error } = await supabase
    .from('songs')
    .select(`${field}`)
    .order('createdAt', { ascending: false })
    .limit(10);
    if (error) throw error;
    //@ts-ignore
    return data.map((row) => row[field]);
  }else{
    const { data, error } = await supabase
    .from('songs')
    .select(`${field}`)
    .like(`${field}`,`%${value}%`)
    .order('createdAt', { ascending: false })
    .limit(10);
  
    if (error) throw error;
    //@ts-ignore
    return data.map((row) => row[field]);
  }
  
}

export async function fetchSongs(params: SearchParams,paginationModel:GridPaginationModel,sortModel:GridSortModel): Promise<{total:number,songs:Song[]}> {
  // Filter out undefined values
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
  );
  
  const {count, error:countError} = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true })
    .match(query);

  let partialQuery = supabase
    .from('songs')
    .select('*')
    .match(query)
  if(sortModel.length>0){
    for(let i=0;i<sortModel.length;i++){
      partialQuery=partialQuery.order(sortModel[i].field, { ascending: sortModel[i].sort === 'asc' })
    }
  }else{
    partialQuery=partialQuery.order('createdAt', { ascending: false })
  }
  if(paginationModel){
    const {pageSize,page}=paginationModel
    partialQuery=partialQuery.range(pageSize*page,pageSize*(page+1)-1)
  }
  const { data, error } = await partialQuery;
  console.log(count)
  if (error||countError) throw error;
  return {total:count??0,songs:data};
}

export async function fetchAllSongs(): Promise<Song[]> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('createdAt', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function deleteSong(id: string) {
  const { error } = await supabase
    .from('songs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
export async function fetchSongById(id: string): Promise<Song> {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSong(id: string, data: SongFormData) {
  const { error } = await supabase
    .from('songs')
    .update(data)
    .eq('id', id);
  
  if (error) throw error;
}

export async function createSong(data: SongFormData) {
  const insertData = {...data, id:uuid(), updatedAt: new Date().toISOString(), createdAt: new Date().toISOString()}
  const { error } = await supabase
    .from('songs')
    .insert([insertData]);
  
  if (error) throw error;
}