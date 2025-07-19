import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Inventory Management System | Dashboard & Stock Control",
  description:
    "Track stock, manage suppliers, and monitor inventory with ease using our real-time inventory dashboard.",
}

export default async function Home({
  params,
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(params.countryCode || "us")
  if (!region) return null

  return (
    <main className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-100 via-blue-100 to-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            🚀 Launch Your Inventory System Today!
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Track, manage, and optimize your stock in real-time with our powerful, easy-to-use dashboard.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a
              href="/account"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:brightness-110 transition"
            >
              Create Account
            </a>
            <a
              href="/store"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 underline decoration-blue-500 decoration-4">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "📊 Real-Time Tracking",
                description:
                  "Instantly monitor inventory levels, movements, and updates as they happen.",
              },
              {
                title: "🚨 Smart Stock Alerts",
                description:
                  "Receive automatic notifications when stock is low or expiring soon.",
              },
              {
                title: "🌍 Multi-Warehouse Sync",
                description:
                  "Manage inventory across multiple warehouses or locations from one dashboard.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-2xl shadow-md bg-gradient-to-br from-white via-blue-50 to-purple-50 hover:shadow-xl transition-transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-blue-800">{feature.title}</h3>
                <p className="mt-3 text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Start Managing Inventory Effortlessly</h2>
          <p className="mt-4 text-lg">
            Join businesses that streamline their operations with our intuitive system.
          </p>
          <div className="mt-6">
            <a
              href="/account"
              className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
