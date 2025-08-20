# PowerShell script to replace read-time calculations
$filePath = "src/components/AIBuzzLayout.astro"

# Read the file content
$content = Get-Content $filePath -Raw

# The old complex calculation pattern
$oldPattern = 'Math\.max\(1, Math\.ceil\(\(\(article\.excerpt \? article\.excerpt\.split\(/\\s\+/\)\.length : 0\) \+ \(article\.content \? portableTextToPlainText\(article\.content\)\.split\(/\\s\+/\)\.length : 0\)\) / 200\)\)\)'

# The new simple function call
$newPattern = 'calculateReadTime(article)'

# Replace all occurrences
$newContent = $content -replace $oldPattern, $newPattern

# Write the file back
Set-Content $filePath $newContent -NoNewline

Write-Host "Successfully replaced read-time calculations with calculateReadTime function calls!"
$count = ([regex]::Matches($content, $oldPattern)).Count
Write-Host "Replaced $count occurrences."
