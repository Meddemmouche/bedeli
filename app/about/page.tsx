// app/about/page.tsx
import Link from 'next/link';
import { ArrowRight, Recycle, Shield, Users, Zap, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trade Smart, Live Better
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Bedeli is a community-driven platform where people exchange items they own for things they actually need. 
            No money, no hassle—just fair trades between real people.
          </p>
          <Link 
            href="/connection"
            className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Start Trading Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in a world where value isn't just measured in currency. 
              Bedeli empowers people to exchange goods directly, reducing waste, 
              building community, and making sustainable living accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable</h3>
              <p className="text-gray-600">
                Reduce waste by giving items a second life. Every trade is a step toward a circular economy.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community-Driven</h3>
              <p className="text-gray-600">
                Connect with neighbors and people nearby. Build relationships through meaningful exchanges.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fair & Simple</h3>
              <p className="text-gray-600">
                No hidden fees, no complicated rules. Just honest trades between people who value different things.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Post Your Item</h3>
              <p className="text-sm text-gray-600">
                List what you want to trade—games, electronics, collectibles, anything!
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse & Discover</h3>
              <p className="text-sm text-gray-600">
                Find items you want and see what others are offering in return.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Propose Trade</h3>
              <p className="text-sm text-gray-600">
                Send a trade proposal. Negotiate until both parties are happy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Make the Exchange</h3>
              <p className="text-sm text-gray-600">
                Meet safely, verify items, and complete the trade. It's that simple!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bedeli */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Bedeli?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                <p className="text-gray-600">
                  User profiles, ratings, and verification systems help you trade with confidence. 
                  We recommend meeting in public places for all exchanges.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick & Easy</h3>
                <p className="text-gray-600">
                  Post items in seconds, propose trades instantly, and coordinate exchanges 
                  through our built-in messaging system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Local First</h3>
                <p className="text-gray-600">
                  Connect with people in your area for convenient, face-to-face exchanges. 
                  Build your local trading community.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
                <p className="text-gray-600">
                  No transaction fees, no listing charges, no subscriptions. 
                  Bedeli is completely free to use, forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Trade */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Can You Trade?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Gaming', emoji: '🎮', examples: 'Consoles, games, accessories' },
              { name: 'Electronics', emoji: '📱', examples: 'Phones, laptops, tablets' },
              { name: 'Collectibles', emoji: '🎨', examples: 'Cards, figures, art' },
              { name: 'Toys', emoji: '🧸', examples: 'LEGO, action figures, puzzles' },
              { name: 'Fashion', emoji: '👟', examples: 'Sneakers, clothing, accessories' },
              { name: 'Books', emoji: '📚', examples: 'Novels, textbooks, comics' },
              { name: 'Sports', emoji: '⚽', examples: 'Equipment, gear, memorabilia' },
              { name: 'Other', emoji: '✨', examples: 'Tools, furniture, appliances' },
            ].map((category) => (
              <div key={category.name} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">{category.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Bedeli was born from a simple observation: we all have things we don't use anymore, 
              and we all want things we don't have. The traditional approach—sell old, buy new—
              involves unnecessary friction, fees, and environmental waste.
            </p>
            <p className="mb-4">
              We asked ourselves: what if people could trade directly? What if your unused PlayStation 
              could become someone's dream gaming setup, while their guitar becomes yours? What if we 
              could build a community around fair, direct exchanges?
            </p>
            <p className="mb-4">
              That's Bedeli—Arabic for "exchange" or "instead of." We're building a platform where 
              value is personal, trades are fair, and sustainability is built into every transaction.
            </p>
            <p>
              Join thousands of traders who are discovering a better way to get what they want 
              while giving their items a second life. Welcome to the future of exchange.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Trading Safely</h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Meet in public places</strong> during daylight hours—coffee shops, malls, or police station parking lots
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Verify item condition</strong> before completing the trade—test electronics, check for damage
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Trust your instincts</strong>—if something feels off, don't proceed with the trade
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Check user ratings</strong> and trade history before committing to an exchange
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Communicate clearly</strong> about item condition, included accessories, and expectations
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">✓</span>
                <span className="text-gray-700">
                  <strong>Bring a friend</strong> when meeting someone for the first time
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and discover the joy of fair, sustainable exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/connection"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up Free
            </Link>
            <Link
              href="/"
              className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-800 transition-colors border-2 border-white"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2">
            Have questions? Contact us at{' '}
            <a href="mailto:support@bedeli.com" className="text-red-400 hover:text-red-300">
              support@bedeli.com
            </a>
          </p>
          <p className="text-sm">
            Please read our <a href="#">Privecy Policy</a>
          </p>
        </div>
      </section>
    </main>
  );
}