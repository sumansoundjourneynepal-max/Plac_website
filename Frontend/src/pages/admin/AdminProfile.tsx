"use client"

import { useState } from 'react'
import { Save, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const AdminProfile = () => {
  const { adminUser, updateProfile, changePassword, hasPermission } = useAdminAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: adminUser?.firstName || '',
    lastName: adminUser?.lastName || '',
    email: adminUser?.email || '',
    phone: adminUser?.phone || '',
    bio: adminUser?.bio || '',
    avatar: adminUser?.avatar || ''
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Password validation
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: true
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }))

    // Validate password
    if (field === 'newPassword') {
      setPasswordErrors({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        match: value === passwordData.confirmPassword
      })
    }

    if (field === 'confirmPassword') {
      setPasswordErrors(prev => ({
        ...prev,
        match: value === passwordData.newPassword
      }))
    }
  }

  const handleProfileSave = async () => {
    if (!adminUser) return

    setIsSaving(true)
    try {
      await updateProfile(adminUser.id, profileData)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSave = async () => {
    if (!adminUser) return

    // Validation
    if (!passwordData.currentPassword) {
      alert('Please enter your current password')
      return
    }

    if (!passwordData.newPassword) {
      alert('Please enter a new password')
      return
    }

    if (!passwordErrors.length || !passwordErrors.uppercase || !passwordErrors.lowercase || 
        !passwordErrors.number || !passwordErrors.special) {
      alert('Please ensure your new password meets all requirements')
      return
    }

    if (!passwordErrors.match) {
      alert('New passwords do not match')
      return
    }

    setIsSaving(true)
    try {
      await changePassword(adminUser.id, passwordData.currentPassword, passwordData.newPassword)
      alert('Password changed successfully!')
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Failed to change password. Please check your current password.')
    } finally {
      setIsSaving(false)
    }
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.avatar ? (
              <img 
                src={profileData.avatar} 
                alt={adminUser?.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 bg-gold text-white p-1.5 rounded-full hover:bg-gold/90">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
          <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleProfileChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleProfileChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Tell us about yourself..."
            maxLength={500}
          />
          <p className="text-xs text-gray-500 mt-1">
            {profileData.bio.length}/500 characters
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleProfileSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 disabled:opacity-50"
        >
          <Save size={16} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )

  const renderPasswordTab = () => (
    <div className="space-y-6 max-w-lg">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800">Password Requirements</h4>
        <ul className="mt-2 text-sm text-blue-700 space-y-1">
          <li className={`flex items-center ${passwordErrors.length ? 'text-green-600' : ''}`}>
            {passwordErrors.length ? '✓' : '○'} At least 8 characters
          </li>
          <li className={`flex items-center ${passwordErrors.uppercase ? 'text-green-600' : ''}`}>
            {passwordErrors.uppercase ? '✓' : '○'} At least one uppercase letter
          </li>
          <li className={`flex items-center ${passwordErrors.lowercase ? 'text-green-600' : ''}`}>
            {passwordErrors.lowercase ? '✓' : '○'} At least one lowercase letter
          </li>
          <li className={`flex items-center ${passwordErrors.number ? 'text-green-600' : ''}`}>
            {passwordErrors.number ? '✓' : '○'} At least one number
          </li>
          <li className={`flex items-center ${passwordErrors.special ? 'text-green-600' : ''}`}>
            {passwordErrors.special ? '✓' : '○'} At least one special character
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type={showNewPassword ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                passwordData.newPassword && !passwordErrors.length ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold ${
                passwordData.confirmPassword && !passwordErrors.match ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordData.confirmPassword && !passwordErrors.match && (
            <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handlePasswordSave}
          disabled={isSaving}
          className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 disabled:opacity-50"
        >
          <Save size={16} className="mr-2" />
          {isSaving ? 'Changing...' : 'Change Password'}
        </button>
      </div>
    </div>
  )

  if (!adminUser) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Profile Not Found</h3>
        <p className="mt-1 text-sm text-gray-500">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and security</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User size={16} className="mr-2" />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'password'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Lock size={16} className="mr-2" />
              Change Password
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' ? renderProfileTab() : renderPasswordTab()}
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Last Login</h4>
            <p className="mt-1 text-sm text-gray-900">
              {adminUser.lastLogin ? new Date(adminUser.lastLogin).toLocaleString() : 'Never'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Account Created</h4>
            <p className="mt-1 text-sm text-gray-900">
              {adminUser.createdAt ? new Date(adminUser.createdAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Role</h4>
            <p className="mt-1 text-sm text-gray-900">{adminUser.role}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Status</h4>
            <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              adminUser.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {adminUser.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile