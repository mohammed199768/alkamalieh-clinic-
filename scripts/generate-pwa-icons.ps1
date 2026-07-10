Add-Type -AssemblyName System.Drawing
$out = Join-Path $PSScriptRoot "..\public\pwa"
New-Item -ItemType Directory -Force -Path $out | Out-Null

function New-KamaliaIcon([int]$Size, [string]$Name, [bool]$Maskable) {
  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml("#1c61d4"))
  $scale = if ($Maskable) { 0.58 } else { 0.72 }
  $w = [int]($Size * $scale); $h = $w
  $x = [int](($Size - $w) / 2); $y = [int](($Size - $h) / 2)
  $font = New-Object System.Drawing.Font("Arial", [single]($w * 0.72), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  $g.DrawString("K", $font, [System.Drawing.Brushes]::White, (New-Object System.Drawing.RectangleF($x,$y,$w,$h)), $format)
  $pen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#9ee8f4"), [single]([Math]::Max(2,$Size*0.025)))
  [System.Drawing.PointF[]]$points = @(
    [System.Drawing.PointF]::new([single]($Size * .20),[single]($Size * .72)), [System.Drawing.PointF]::new([single]($Size * .34),[single]($Size * .72)),
    [System.Drawing.PointF]::new([single]($Size * .40),[single]($Size * .64)), [System.Drawing.PointF]::new([single]($Size * .47),[single]($Size * .80)),
    [System.Drawing.PointF]::new([single]($Size * .55),[single]($Size * .56)), [System.Drawing.PointF]::new([single]($Size * .64),[single]($Size * .72)),
    [System.Drawing.PointF]::new([single]($Size * .80),[single]($Size * .72))
  )
  $g.DrawLines($pen, [System.Drawing.PointF[]]$points)
  $bitmap.Save((Join-Path $out $Name), [System.Drawing.Imaging.ImageFormat]::Png)
  $pen.Dispose(); $font.Dispose(); $format.Dispose(); $g.Dispose(); $bitmap.Dispose()
}

New-KamaliaIcon 192 "icon-192.png" $false
New-KamaliaIcon 512 "icon-512.png" $false
New-KamaliaIcon 512 "icon-maskable-512.png" $true
New-KamaliaIcon 180 "apple-touch-icon.png" $false
