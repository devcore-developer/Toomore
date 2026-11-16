<#
=====================================================================
 collect_toomore_files.ps1  -  Toomore x Microsoft Clarity audit bundle
=====================================================================
Collects ONLY the files needed to implement the "Microsoft Clarity
integration" prompt:

  1. Root layout, providers, home page, sitemap, middleware, configs
  2. ALL layout.tsx files under app/ (root + (routes) + Admin layout)
  3. The whole Admin dashboard folder (to design the exclusion logic)
  4. The checkout route + checkout components (privacy/masking review)
  5. Keyword scan across all source files for existing tracking scripts
     (clarity / gtag / googletagmanager / datalayer / hotjar / fbq /
      pixel / analytics / next/script) + copies the matching .ts/.tsx
  6. Route inventory: every page.tsx, layout.tsx and api route.ts

Reports written into the bundle:
  MANIFEST.txt          - what was collected and why
  ANALYTICS_SEARCH.txt  - every tracking-related code line found
  ROUTES.txt            - full route inventory (pages + api + layouts)

NEVER collected (on purpose):
  .env* files, node_modules, .next, .git, package-lock.json,
  yarn.lock, pnpm-lock.yaml, lib/firebase-admin.ts and any Firebase
  credential files.

HOW TO RUN (place this file in the Toomore project root):
  powershell -NoProfile -ExecutionPolicy Bypass -File .\collect_toomore_files.ps1
or just double-click run_collect.bat (keep both files in the root).

Output:
  <Desktop>\Toomore_clarity_audit\          (folder)
  <Desktop>\Toomore_clarity_audit.zip       (send this back)
=====================================================================
#>

param(
    [string]$Root = $PSScriptRoot
)

$ErrorActionPreference = 'Continue'

# ---------------- normalize root path ----------------
try {
    $Root = (Resolve-Path -LiteralPath $Root).Path
} catch {
    Write-Host "ERROR: project root not found: $Root" -ForegroundColor Red
    exit 1
}
$rootNorm   = $Root.TrimEnd('\', '/')
$rootPrefix = $rootNorm + [IO.Path]::DirectorySeparatorChar
$sep        = [IO.Path]::DirectorySeparatorChar

Write-Host ""
Write-Host "=== Toomore Clarity audit - file collector ==="
Write-Host "Project root : $rootNorm"

if (-not (Test-Path -LiteralPath (Join-Path $rootNorm 'app') -PathType Container)) {
    Write-Host "WARNING: 'app' folder not found here. Make sure this script sits in the Toomore project root." -ForegroundColor Yellow
}

# ---------------- helpers ----------------
$script:bundled = [ordered]@{}   # lowercase relpath -> relpath (as on disk)

function Get-RelPath([string]$FullPath) {
    if ($FullPath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
        return $FullPath.Substring($rootPrefix.Length)
    }
    return $FullPath
}

function Add-FileToBundle([string]$FullPath) {
    $name = Split-Path $FullPath -Leaf
    if ($name -like '.env*') { return }                      # never collect secrets
    if ($name -like '*firebase-admin*') { return }           # never collect credentials
    $rel = Get-RelPath $FullPath
    $key = $rel.ToLower()
    if ($script:bundled.Contains($key)) { return }
    $dest    = Join-Path $out $rel
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path -LiteralPath $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item -LiteralPath $FullPath -Destination $dest -Force
    $script:bundled[$key] = $rel
}

# ---------------- output folder ----------------
$desktop = [Environment]::GetFolderPath('Desktop')
if ([string]::IsNullOrWhiteSpace($desktop) -or (-not (Test-Path -LiteralPath $desktop))) {
    $desktop = Split-Path -Parent $rootNorm     # fallback: parent of project root
}
$out = Join-Path $desktop 'Toomore_clarity_audit'
$zip = Join-Path $desktop 'Toomore_clarity_audit.zip'

if (Test-Path -LiteralPath $out) { Remove-Item -LiteralPath $out -Recurse -Force }
New-Item -ItemType Directory -Path $out -Force | Out-Null
Write-Host "Output folder : $out"

# ---------------- 1. explicit files ----------------
$explicit = @(
    'package.json',
    'next.config.js', 'next.config.mjs', 'next.config.ts',
    'tsconfig.json',
    'middleware.ts', 'src/middleware.ts',
    'app/layout.tsx', 'app/providers.tsx', 'app/page.tsx', 'app/sitemap.ts',
    'src/app/layout.tsx', 'src/app/providers.tsx', 'src/app/page.tsx', 'src/app/sitemap.ts'
)
$explicitFound = 0
foreach ($rel in $explicit) {
    $p = Join-Path $rootNorm $rel
    if (Test-Path -LiteralPath $p -PathType Leaf) {
        Add-FileToBundle $p
        $explicitFound++
    }
}
Write-Host ("[1/5] Config + root app files copied : {0}" -f $explicitFound)

# ---------------- 2. every layout.tsx under app/ ----------------
$appDirs = @((Join-Path $rootNorm 'app'), (Join-Path $rootNorm 'src/app')) |
    Where-Object { Test-Path -LiteralPath $_ -PathType Container }
$layoutCount = 0
foreach ($ad in $appDirs) {
    Get-ChildItem -LiteralPath $ad -Recurse -Filter 'layout.tsx' -File |
        ForEach-Object { Add-FileToBundle $_.FullName; $layoutCount++ }
}
Write-Host ("[2/5] layout.tsx files copied        : {0}" -f $layoutCount)

# ---------------- 3. admin folder + checkout ----------------
$adminCandidates    = @('app/(routes)/admin', 'app/admin', 'src/app/(routes)/admin', 'src/app/admin')
$checkoutCandidates = @('app/(routes)/checkout', 'app/checkout', 'src/app/(routes)/checkout', 'src/app/checkout')
$adminDir = $null; $checkoutDir = $null
foreach ($c in $adminCandidates) {
    $p = Join-Path $rootNorm $c
    if (Test-Path -LiteralPath $p -PathType Container) { $adminDir = $p; break }
}
foreach ($c in $checkoutCandidates) {
    $p = Join-Path $rootNorm $c
    if (Test-Path -LiteralPath $p -PathType Container) { $checkoutDir = $p; break }
}
if ($adminDir) {
    Get-ChildItem -LiteralPath $adminDir -Recurse -File |
        ForEach-Object { Add-FileToBundle $_.FullName }
    Write-Host ("[3/5] Admin dashboard folder copied  : {0}" -f (Get-RelPath $adminDir))
} else {
    Write-Host "[3/5] Admin dashboard folder NOT found (searched app/(routes)/admin and app/admin)" -ForegroundColor Yellow
}
if ($checkoutDir) {
    Get-ChildItem -LiteralPath $checkoutDir -Recurse -File |
        ForEach-Object { Add-FileToBundle $_.FullName }
    Write-Host ("      Checkout route copied          : {0}" -f (Get-RelPath $checkoutDir))
}
$compCheckout = Join-Path $rootNorm 'components/checkout'
if (Test-Path -LiteralPath $compCheckout -PathType Container) {
    Get-ChildItem -LiteralPath $compCheckout -Recurse -File -Include '*.tsx', '*.ts' |
        ForEach-Object { Add-FileToBundle $_.FullName }
    Write-Host "      Checkout components copied     : components/checkout"
}

# ---------------- 4. keyword scan for existing tracking scripts ----------------
$exts = '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json'
$excludedDirRegex = '[\\/](node_modules|\.next|\.git|\.vercel|out|dist|build|coverage)([\\/]|$)'
$scanFiles = Get-ChildItem -LiteralPath $rootNorm -Recurse -File | Where-Object {
    ($exts -contains $_.Extension.ToLower()) -and
    ($_.Name -ne 'package-lock.json') -and
    ($_.Name -ne 'yarn.lock') -and
    ($_.Name -ne 'pnpm-lock.yaml') -and
    (-not ($_.FullName -match $excludedDirRegex)) -and
    (-not $_.FullName.StartsWith($out, [StringComparison]::OrdinalIgnoreCase))
}

$pattern = 'clarity|gtag|googletagmanager|gtm\.|datalayer|hotjar|fbq|pixel|analytics|next/script|<script'
$hitLines = @()
if ($scanFiles.Count -gt 0) {
    $hitLines = Select-String -LiteralPath $scanFiles.FullName -Pattern $pattern -ErrorAction SilentlyContinue
}

$searchPath = Join-Path $out 'ANALYTICS_SEARCH.txt'
$searchLines = @(
    '=== Existing tracking / script references in the Toomore codebase ===',
    ('Pattern (case-insensitive) : ' + $pattern),
    ('Files scanned              : ' + $scanFiles.Count),
    ('Matching lines             : ' + $hitLines.Count),
    ''
)
if ($hitLines.Count -gt 0) {
    foreach ($m in $hitLines) {
        $txt = $m.Line.Trim()
        if ($txt.Length -gt 240) { $txt = $txt.Substring(0, 240) + ' ...' }
        $searchLines += ('{0}:{1}: {2}' -f (Get-RelPath $m.Path), $m.LineNumber, $txt)
    }
    # copy every source file that contains a hit (code files only)
    $hitFiles = $hitLines |
        ForEach-Object { $_.Path } |
        Sort-Object -Unique |
        Where-Object { $exts -contains [IO.Path]::GetExtension($_).ToLower() -and [IO.Path]::GetExtension($_).ToLower() -ne '.json' }
    foreach ($hf in $hitFiles) { Add-FileToBundle $hf }
} else {
    $searchLines += 'No existing tracking scripts found.'
}
Set-Content -LiteralPath $searchPath -Value $searchLines -Encoding UTF8
Write-Host ("[4/5] Tracking-keyword scan hits     : {0} lines in ANALYTICS_SEARCH.txt" -f $hitLines.Count)

# ---------------- 5. route inventory ----------------
$routesPath = Join-Path $out 'ROUTES.txt'
$routeLines = @('=== Toomore route inventory ===', '')
foreach ($ad in $appDirs) {
    $routeLines += ('[app root] ' + (Get-RelPath $ad))
    Get-ChildItem -LiteralPath $ad -Recurse -File | Where-Object {
        $_.Name -in 'page.tsx', 'layout.tsx', 'route.ts'
    } | ForEach-Object {
        $rel = Get-RelPath $_.FullName
        if     ($_.Name -eq 'page.tsx')   { $routeLines += ('  PAGE   /' + $rel) }
        elseif ($_.Name -eq 'route.ts')   { $routeLines += ('  API    /' + $rel) }
        else                              { $routeLines += ('  LAYOUT /' + $rel) }
    }
    $routeLines += ''
}
Set-Content -LiteralPath $routesPath -Value $routeLines -Encoding UTF8
Write-Host "[5/5] Route inventory written        : ROUTES.txt"

# ---------------- manifest ----------------
$manifestLines = @(
    '=== Toomore Clarity audit bundle ===',
    ('Generated    : ' + (Get-Date -Format 'yyyy-MM-dd HH:mm')),
    ('Project root : ' + $rootNorm),
    ('PowerShell   : ' + $PSVersionTable.PSVersion.ToString()),
    ('Files in bundle : ' + $script:bundled.Count),
    '',
    '--- Collected files ---'
)
$totalSize = 0
foreach ($rel in $script:bundled.Values) {
    $f = Get-Item -LiteralPath (Join-Path $out $rel)
    $totalSize += $f.Length
    $manifestLines += ('  {0}  ({1} bytes)' -f $rel, $f.Length)
}
$manifestLines += ''
$manifestLines += '--- Intentionally NOT collected ---'
$manifestLines += '  .env* files, node_modules, .next, .git, package-lock.json,'
$manifestLines += '  yarn.lock, pnpm-lock.yaml, lib/firebase-admin.ts (credentials).'
$manifestLines += ''
$manifestLines += ('Total collected size : {0:N1} KB' -f ($totalSize / 1KB))
Set-Content -LiteralPath (Join-Path $out 'MANIFEST.txt') -Value $manifestLines -Encoding UTF8

# ---------------- zip ----------------
$zipDone = $false
try {
    if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
    Compress-Archive -LiteralPath $out -DestinationPath $zip -Force
    $zipDone = $true
} catch {
    Write-Host "WARNING: could not create the zip file ($($_.Exception.Message)). The folder itself is complete." -ForegroundColor Yellow
}

# ---------------- summary ----------------
$zipSize = ''
if ($zipDone -and (Test-Path -LiteralPath $zip)) {
    $zipSize = (' ({0:N1} KB)' -f ((Get-Item -LiteralPath $zip).Length / 1KB))
}
Write-Host ""
Write-Host "============================================"
Write-Host (" DONE - {0} files collected ({1:N1} KB)" -f $script:bundled.Count, ($totalSize / 1KB))
Write-Host (" Folder : {0}" -f $out)
if ($zipDone) { Write-Host (" Zip    : {0}{1}" -f $zip, $zipSize) }
Write-Host " Next   : send Toomore_clarity_audit.zip back so the"
Write-Host "          Microsoft Clarity integration can be implemented."
Write-Host "============================================"
