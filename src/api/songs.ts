import { SearchParams, Song, SongFormData } from '../types/Song';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export async function fetchSuggestions(field: keyof Song, value: string): Promise<string[]> {
  if(value.length<1){
    let { data, error } = await supabase
    .from('songs')
    .select(`${field}`)
    .order('createdAt', { ascending: false })
    .limit(10);
    if (error) throw error;
    //@ts-ignore
    return data.map((row) => row[field]);
  }else{
    let { data, error } = await supabase
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

export async function fetchSongs(params: SearchParams): Promise<Song[]> {
  // Filter out undefined values
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== '')
  );


  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .match(query)
    .order('createdAt', { ascending: false })
    .limit(30);

  
  if (error) throw error;
  return data;
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