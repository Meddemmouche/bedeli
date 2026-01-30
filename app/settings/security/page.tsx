export default function SecuritySettings() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Settings</h1>
      <p className="text-gray-600 mb-8">Manage your password and authentication</p>
      
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input 
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input 
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="••••••••"
          />
        </div>
        
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Update Password
        </button>
      </div>
    </div>
  );
}