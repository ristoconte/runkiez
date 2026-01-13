'use client'

import { useState } from 'react'
import { User } from '@/lib/types/database'
import { updateProfile } from './actions'

interface ProfileViewProps {
  user: User
}

export default function ProfileView({ user }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setIsEditing(false)
      setTimeout(() => setSuccess(false), 3000)
    }

    setLoading(false)
  }

  const formatPace = (seconds: number | null) => {
    if (!seconds) return 'Not set'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')} min/km`
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name || 'Your Profile'}</h1>
          <p className="text-gray-600 mt-1">
            {user.role === 'coach' ? 'Coach' : 'Runner'} • {user.email}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit Profile
          </button>
        )}
      </div>

      {success && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">Profile updated successfully!</p>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={user.name || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={3}
                  defaultValue={user.bio || ''}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                  Neighborhood
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  defaultValue={user.neighborhood || ''}
                  placeholder="e.g., Kreuzberg, Prenzlauer Berg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pace_min" className="block text-sm font-medium text-gray-700">
                    Min Pace (seconds/km)
                  </label>
                  <input
                    type="number"
                    name="pace_min"
                    id="pace_min"
                    defaultValue={user.pace_min || ''}
                    placeholder="240"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                  />
                </div>
                <div>
                  <label htmlFor="pace_max" className="block text-sm font-medium text-gray-700">
                    Max Pace (seconds/km)
                  </label>
                  <input
                    type="number"
                    name="pace_max"
                    id="pace_max"
                    defaultValue={user.pace_max || ''}
                    placeholder="360"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="preferred_distances" className="block text-sm font-medium text-gray-700">
                  Preferred Distances
                </label>
                <input
                  type="text"
                  name="preferred_distances"
                  id="preferred_distances"
                  defaultValue={user.preferred_distances?.join(', ') || ''}
                  placeholder="5K, 10K, Half Marathon"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                />
                <p className="mt-1 text-sm text-gray-500">Comma-separated list</p>
              </div>

              <div>
                <label htmlFor="strava_url" className="block text-sm font-medium text-gray-700">
                  Strava Profile URL
                </label>
                <input
                  type="url"
                  name="strava_url"
                  id="strava_url"
                  defaultValue={user.strava_url || ''}
                  placeholder="https://www.strava.com/athletes/..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm px-3 py-2 border"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setError(null)
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.bio || 'No bio added yet'}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Neighborhood</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.neighborhood || 'Not specified'}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900 capitalize">{user.role}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Pace Range</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.pace_min && user.pace_max
                    ? `${formatPace(user.pace_min)} - ${formatPace(user.pace_max)}`
                    : 'Not set'}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Preferred Distances</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.preferred_distances && user.preferred_distances.length > 0
                    ? user.preferred_distances.join(', ')
                    : 'Not specified'}
                </dd>
              </div>

              {user.strava_url && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Strava Profile</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={user.strava_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      {user.strava_url}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}
    </div>
  )
}
