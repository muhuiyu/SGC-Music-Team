import { createClient } from '@supabase/supabase-js'
import { User as SupabaseUser } from '@supabase/supabase-js'
import User from '../../models/user/User'
import { usersReference } from '../constants/QueryKeys'
import _ from 'lodash'

// Setup
const supabaseUrl = 'https://lxnkjsazarmoeuyfhtqz.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bmtqc2F6YXJtb2V1eWZodHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NDY1MzksImV4cCI6MjAwNTIyMjUzOX0.IxflI4fV5eD_QO85RQpmpUoTKYLVx7GzxrYYwgzQGeI'
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getUserProfile(userId: SupabaseUser['id']): Promise<User | null> {
  const { data, error } = await supabase.from(usersReference).select().eq('id', userId)
  if (data === null || _.isEmpty(data)) return null
  return data[0] as User
}
