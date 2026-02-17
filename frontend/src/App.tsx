import { useMemo, useState } from 'react'

type HelloResponse = {
  message: string
}

function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export default function App() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // 线上（Zeabur）：设置 VITE_API_BASE_URL 为后端公网地址
  // 本地：不设置，走 Vite 代理（/api -> http://localhost:8080）
  const apiBaseUrl = useMemo(() => (import.meta.env.VITE_API_BASE_URL ?? '').trim(), [])
  const endpoint = useMemo(() => (apiBaseUrl ? joinUrl(apiBaseUrl, '/api/hello') : '/api/hello'), [apiBaseUrl])

  async function onClick() {
    setLoading(true)
    setError('')
    setResult('')

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data = (await res.json()) as HelloResponse
      setResult(data.message ?? '')
    } catch (e) {
      setError(e instanceof Error ? e.message : '请求失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3>Vite 前端</h3>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入 name"
          aria-label="name"
        />
        <button onClick={onClick} disabled={loading}>
          {loading ? '请求中...' : '调用后端 /api/hello'}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>结果：</div>
        {error ? <pre style={{ color: 'crimson' }}>{error}</pre> : <pre>{result || '(空)'}</pre>}
      </div>
    </div>
  )
}

