export type User = {
  id: string
  email: string
  name: string | null
  photo_url: string | null
  bio: string | null
  location_lat: number | null
  location_lng: number | null
  neighborhood: string | null
  pace_min: number | null
  pace_max: number | null
  preferred_distances: string[] | null
  strava_url: string | null
  role: 'runner' | 'coach'
  stripe_account_id: string | null
  stripe_onboarding_complete: boolean
  has_insurance: boolean
  certification: string | null
  is_verified: boolean
  created_at: string
}

export type Club = {
  id: string
  name: string
  slug: string
  description: string | null
  location_lat: number | null
  location_lng: number | null
  neighborhood: string | null
  schedule: string | null
  website_url: string | null
  instagram_url: string | null
  source: 'seeded' | 'user_submitted' | 'verified'
  member_count: number
  is_approved: boolean
  created_at: string
}
