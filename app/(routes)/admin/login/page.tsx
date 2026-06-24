'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/auth-store'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      setUser(cred.user)
      router.push('/admin')
    } catch (err: any) {
      setError(err.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : err.code === 'auth/too-many-requests'
        ? 'Too many attempts. Try again later.'
        : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5EFE4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 24,
        padding: '48px 40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 28,
            fontWeight: 600,
            color: '#0E5B4F',
            letterSpacing: 1,
          }}>
            TOO<span style={{ color: '#B78A52' }}>MORE</span>
          </span>
          <p style={{ fontSize: 14, color: '#6A675F', marginTop: 8 }}>
            Admin Dashboard Login
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#1E1E1E', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@toomore.eg"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid rgba(14,91,79,0.12)',
                fontSize: 14,
                fontFamily: 'var(--font-inter), sans-serif',
                outline: 'none',
                background: '#F9F6F0',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#1E1E1E', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid rgba(14,91,79,0.12)',
                fontSize: 14,
                fontFamily: 'var(--font-inter), sans-serif',
                outline: 'none',
                background: '#F9F6F0',
              }}
            />
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: '#FFEBEE',
              color: '#C62828',
              fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: 'none',
              background: loading ? '#ccc' : '#0E5B4F',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-inter), sans-serif',
              transition: 'all 0.2s ease',
              marginTop: 8,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#6A675F',
          marginTop: 24,
        }}>
          <a href="/" style={{ color: '#0E5B4F', textDecoration: 'none' }}>← Back to website</a>
        </p>
      </div>
    </div>
  )
}