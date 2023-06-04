import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import {Config} from 'react-native-config';
import {ItemData} from '../components/Item';

const supabaseUrl = 'https://klywutarknrunrxaxrfp.supabase.co';
const supabaseKey = Config.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

export const get_users = async () => {
  try {
    let {data: users} = await supabase.from('users').select('*');
    console.log(users);
    return users as ItemData[];
  } catch (err) {
    throw new Error(err);
  }
};

export const add_user = async (user: string, id: number) => {
  try {
    let _ = await supabase.from('users').insert({id, name: user});
  } catch (err) {
    throw new Error(err);
  }
};
