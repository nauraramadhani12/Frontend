$ErrorActionPreference = "Stop"

$repoRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$env:CBM_ALLOWED_ROOT = $repoRoot

$installRoot = if ($env:CODEBASE_MEMORY_MCP_DIR) {
  $env:CODEBASE_MEMORY_MCP_DIR
} else {
  Join-Path $env:LOCALAPPDATA "Programs\codebase-memory-mcp"
}
$executable = Join-Path $installRoot "codebase-memory-mcp.exe"

if (-not (Test-Path -LiteralPath $executable -PathType Leaf)) {
  [Console]::Error.WriteLine("codebase-memory-mcp was not found at $executable. Install v0.12.1 or set CODEBASE_MEMORY_MCP_DIR.")
  exit 1
}

& $executable
exit $LASTEXITCODE
