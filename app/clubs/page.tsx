export default function ClubsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Running Clubs in Berlin
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover and connect with Berlin&apos;s vibrant running community
        </p>
      </div>

      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Club directory coming soon
        </h3>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          We&apos;re building a comprehensive directory of running clubs across all Berlin neighborhoods.
          Check back soon to discover your perfect running crew!
        </p>
        <div className="mt-6">
          <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white">
            Coming in Phase 2
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
          <div className="text-sm text-gray-600">Clubs across Berlin</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">All</div>
          <div className="text-sm text-gray-600">Skill levels welcome</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
          <div className="text-sm text-gray-600">Community-driven</div>
        </div>
      </div>
    </div>
  )
}
