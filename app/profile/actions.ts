'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const updates = {
    name: formData.get('name') as string,
    bio: formData.get('bio') as string,
    neighborhood: formData.get('neighborhood') as string,
    pace_min: formData.get('pace_min') ? parseInt(formData.get('pace_min') as string) : null,
    pace_max: formData.get('pace_max') ? parseInt(formData.get('pace_max') as string) : null,
    preferred_distances: formData.get('preferred_distances')
      ? (formData.get('preferred_distances') as string).split(',').map(d => d.trim()).filter(d => d)
      : [],
    strava_url: formData.get('strava_url') as string,
  }

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile')
  return { success: true }
}
