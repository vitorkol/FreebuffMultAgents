// Gerado/consolidado tipo-seguro; artefato publicado para runtime é docker/serve.mjs via `pnpm build:docker-serve`.
import http from "node:http"
import { createReadStream, statSync } from "node:fs"
import { join, resolve, extname } from "node:path"

const PORT = Number.parseInt(process.env.PORT ?? "80", 10)

const ROOT = resolve(process.env.STORYBOOK_STATIC_DIR ?? "/app/storybook-static")

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
}

function resolveSafe(urlPath: string | undefined): string | null {
  const clean = (urlPath ?? "/").split("?")[0]?.split("#")[0] ?? "/"
  const decoded = decodeURIComponent(clean)
  const joined = join(ROOT, decoded === "/" ? "/index.html" : decoded)
  const resolvedPath = resolve(joined)
  if (!resolvedPath.startsWith(ROOT)) return null
  return resolvedPath
}

function setHeaders(res: http.ServerResponse): void {
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("X-Frame-Options", "SAMEORIGIN")
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin")
}

function serve(req: http.IncomingMessage, res: http.ServerResponse): void {
  if (req.method === "GET" && req.url === "/healthz") {
    setHeaders(res)
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("ok")
    return
  }

  let target = resolveSafe(req.url)
  if (!target) {
    res.writeHead(400).end("Bad Request")
    return
  }

  try {
    const stats = statSync(target)
    if (stats.isDirectory()) target = join(target, "index.html")
  } catch {
    target = join(ROOT, "index.html")
  }

  try {
    const stats = statSync(target)
    const ext = extname(target).toLowerCase()
    const url = req.url ?? ""
    const isImmutable =
      /\/(assets|sb-(?:common-assets|manager|preview|addons))\//.test(url)
    setHeaders(res)
    const ct = MIME[ext] ?? "application/octet-stream"
    res.setHeader("Content-Type", ct)
    res.setHeader("Content-Length", stats.size)
    res.setHeader(
      "Cache-Control",
      isImmutable ? "public, max-age=31536000, immutable" : "public, max-age=60"
    )
    res.writeHead(200)
    createReadStream(target).pipe(res)
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" })
    res.end("Not Found")
  }
}

http.createServer(serve).listen(PORT, () => {
  console.log(`[biome-storybook] serving ${ROOT} on :${PORT}`)
})
