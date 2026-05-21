Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$assets = Join-Path (Get-Location) "public\assets"
New-Item -ItemType Directory -Force -Path $assets | Out-Null

function ColorFromHex([string]$hex, [int]$alpha = 255) {
  $clean = $hex.TrimStart("#")
  $r = [Convert]::ToInt32($clean.Substring(0, 2), 16)
  $g = [Convert]::ToInt32($clean.Substring(2, 2), 16)
  $b = [Convert]::ToInt32($clean.Substring(4, 2), 16)
  return [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b)
}

function New-Rect([float]$x, [float]$y, [float]$w, [float]$h) {
  return New-Object System.Drawing.RectangleF($x, $y, $w, $h)
}

function New-PathRoundRect([System.Drawing.RectangleF]$rect, [float]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $radius * 2
  $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
  $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
  $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-RoundRect($g, [System.Drawing.RectangleF]$rect, [float]$radius, $brush) {
  $path = New-PathRoundRect $rect $radius
  $g.FillPath($brush, $path)
  $path.Dispose()
}

function Stroke-RoundRect($g, [System.Drawing.RectangleF]$rect, [float]$radius, $pen) {
  $path = New-PathRoundRect $rect $radius
  $g.DrawPath($pen, $path)
  $path.Dispose()
}

function Draw-Shadow($g, [System.Drawing.RectangleF]$rect, [float]$radius) {
  for ($i = 8; $i -ge 1; $i--) {
    $alpha = 6 + $i * 3
    $brush = New-Object System.Drawing.SolidBrush(ColorFromHex "#14121f" $alpha)
    $grow = $i * 2
    Fill-RoundRect $g (New-Rect ($rect.X - $grow / 2) ($rect.Y + $i) ($rect.Width + $grow) ($rect.Height + $grow / 2)) ($radius + $grow) $brush
    $brush.Dispose()
  }
}

function Draw-Text($g, [string]$text, [float]$x, [float]$y, [float]$w, [float]$h, [float]$size, [string]$style, [string]$color, [string]$align = "Near") {
  $fontStyle = [System.Drawing.FontStyle]::Regular
  if ($style -eq "Bold") { $fontStyle = [System.Drawing.FontStyle]::Bold }
  if ($style -eq "Black") { $fontStyle = [System.Drawing.FontStyle]::Bold }
  $family = if ($style -eq "Black") { "Arial Black" } else { "Arial" }
  $font = New-Object System.Drawing.Font($family, $size, $fontStyle, [System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush(ColorFromHex $color)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::$align
  $format.LineAlignment = [System.Drawing.StringAlignment]::Near
  $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
  $g.DrawString($text, $font, $brush, (New-Rect $x $y $w $h), $format)
  $format.Dispose()
  $brush.Dispose()
  $font.Dispose()
}

function Draw-AccentDots($g, [string]$color) {
  $brush = New-Object System.Drawing.SolidBrush(ColorFromHex $color)
  $g.FillEllipse($brush, 448, 54, 36, 36)
  $g.FillEllipse($brush, 96, 384, 28, 28)
  $g.FillEllipse($brush, 504, 384, 20, 20)
  $brush.Dispose()
}

function New-ProductCanvas([string]$file, [scriptblock]$draw) {
  $bmp = New-Object System.Drawing.Bitmap(640, 520, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::Transparent)
  & $draw $g
  $out = Join-Path $assets $file
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

function Draw-Pouch($g, [string]$title, [string]$subtitle, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $rect = New-Rect 180 54 278 382
  Draw-Shadow $g $rect 42
  $brush = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  Fill-RoundRect $g $rect 42 $brush
  $brush.Dispose()
  $shine = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff" 72)
  Fill-RoundRect $g (New-Rect 205 82 90 320) 34 $shine
  $shine.Dispose()
  $white = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff")
  Fill-RoundRect $g (New-Rect 216 178 210 132) 34 $white
  $white.Dispose()
  Draw-Text $g $title 228 104 190 68 38 "Black" "#ffffff" "Center"
  Draw-Text $g $subtitle 238 210 168 56 25 "Black" $main "Center"
  $chip = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  $g.FillEllipse($chip, 242, 316, 52, 52)
  $g.FillEllipse($chip, 332, 326, 64, 64)
  $chip.Dispose()
}

function Draw-Box($g, [string]$title, [string]$subtitle, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $rect = New-Rect 132 128 390 236
  Draw-Shadow $g $rect 32
  $brush = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  Fill-RoundRect $g $rect 32 $brush
  $brush.Dispose()
  $side = New-Object System.Drawing.SolidBrush(ColorFromHex "#101f15" 52)
  Fill-RoundRect $g (New-Rect 398 128 124 236) 30 $side
  $side.Dispose()
  $white = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff")
  $g.FillEllipse($white, 190, 166, 198, 126)
  $white.Dispose()
  Draw-Text $g $title 206 188 166 58 38 "Black" $main "Center"
  Draw-Text $g $subtitle 178 306 230 36 22 "Bold" "#ffffff" "Center"
  $piece = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  Fill-RoundRect $g (New-Rect 408 168 56 48) 12 $piece
  Fill-RoundRect $g (New-Rect 430 232 56 48) 12 $piece
  $piece.Dispose()
}

function Draw-Mochi($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $shadow = New-Object System.Drawing.SolidBrush(ColorFromHex "#14121f" 32)
  $g.FillEllipse($shadow, 150, 340, 340, 48)
  $shadow.Dispose()
  $pink = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  $g.FillEllipse($pink, 126, 168, 214, 178)
  $g.FillEllipse($pink, 276, 142, 230, 202)
  $pink.Dispose()
  $cream = New-Object System.Drawing.SolidBrush(ColorFromHex "#fff3f6")
  $g.FillEllipse($cream, 292, 176, 150, 132)
  $cream.Dispose()
  $red = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  $g.FillEllipse($red, 330, 196, 78, 80)
  $red.Dispose()
  $white = New-Object System.Drawing.Pen((ColorFromHex "#ffffff"), 12)
  $g.DrawArc($white, 340, 206, 58, 54, 200, 130)
  $white.Dispose()
  Draw-Text $g $title 188 70 260 52 34 "Black" "#17141f" "Center"
}

function Draw-Bottle($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $shadow = New-Object System.Drawing.SolidBrush(ColorFromHex "#14121f" 24)
  $g.FillEllipse($shadow, 250, 410, 150, 28)
  $shadow.Dispose()
  $glass = New-Object System.Drawing.SolidBrush(ColorFromHex $main 178)
  Fill-RoundRect $g (New-Rect 262 84 116 54) 18 $glass
  Fill-RoundRect $g (New-Rect 238 134 164 286) 48 $glass
  $glass.Dispose()
  $cap = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  Fill-RoundRect $g (New-Rect 252 52 136 52) 18 $cap
  $cap.Dispose()
  $label = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff" 224)
  Fill-RoundRect $g (New-Rect 254 238 132 92) 28 $label
  $label.Dispose()
  Draw-Text $g $title 260 254 120 46 30 "Black" $accent "Center"
  $bubble = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff" 160)
  $g.FillEllipse($bubble, 304, 158, 22, 22)
  $g.FillEllipse($bubble, 334, 188, 16, 16)
  $bubble.Dispose()
}

function Draw-Sticks($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $pen = New-Object System.Drawing.Pen((ColorFromHex $main), 32)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($pen, 236, 120, 386, 368)
  $g.DrawLine($pen, 302, 106, 446, 346)
  $g.DrawLine($pen, 182, 156, 318, 394)
  $pen.Dispose()
  $tip = New-Object System.Drawing.Pen((ColorFromHex $accent), 24)
  $tip.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $tip.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($tip, 236, 120, 264, 168)
  $g.DrawLine($tip, 302, 106, 330, 154)
  $g.DrawLine($tip, 182, 156, 210, 204)
  $tip.Dispose()
  Draw-Text $g $title 194 66 248 44 32 "Black" "#17141f" "Center"
}

function Draw-Gift($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $box = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  Draw-Shadow $g (New-Rect 138 162 360 232) 28
  Fill-RoundRect $g (New-Rect 138 162 360 232) 28 $box
  $box.Dispose()
  $ribbon = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  Fill-RoundRect $g (New-Rect 300 162 54 232) 18 $ribbon
  Fill-RoundRect $g (New-Rect 138 244 360 48) 18 $ribbon
  $ribbon.Dispose()
  $bow = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff" 220)
  $g.FillEllipse($bow, 236, 104, 104, 74)
  $g.FillEllipse($bow, 334, 104, 104, 74)
  $g.FillEllipse($bow, 304, 126, 54, 54)
  $bow.Dispose()
  Draw-Text $g $title 182 310 270 44 28 "Black" $accent "Center"
}

function Draw-Cookie($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $cookie = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  $g.FillEllipse($cookie, 180, 116, 278, 278)
  $cookie.Dispose()
  $chip = New-Object System.Drawing.SolidBrush(ColorFromHex $accent)
  foreach ($p in @(@(240,176), @(328,166), @(374,236), @(278,280), @(210,252), @(344,324))) {
    $g.FillEllipse($chip, $p[0], $p[1], 34, 34)
  }
  $chip.Dispose()
  Draw-Text $g $title 190 62 260 42 30 "Black" "#17141f" "Center"
}

function Draw-Can($g, [string]$title, [string]$main, [string]$accent) {
  Draw-AccentDots $g $accent
  $can = New-Object System.Drawing.SolidBrush(ColorFromHex $main)
  Fill-RoundRect $g (New-Rect 218 86 204 328) 42 $can
  $can.Dispose()
  $top = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff" 168)
  $g.FillEllipse($top, 236, 94, 168, 36)
  $g.FillEllipse($top, 236, 378, 168, 36)
  $top.Dispose()
  $label = New-Object System.Drawing.SolidBrush(ColorFromHex "#ffffff")
  Fill-RoundRect $g (New-Rect 244 190 152 118) 34 $label
  $label.Dispose()
  Draw-Text $g $title 254 210 132 62 30 "Black" $accent "Center"
}

New-ProductCanvas "pocky-strawberry.png" { param($g) Draw-Pouch $g "Pocky" "Strawberry" "#f72a8a" "#b7f300" }
New-ProductCanvas "kitkat-matcha.png" { param($g) Draw-Box $g "KitKat" "Matcha green tea" "#159447" "#b7f300" }
New-ProductCanvas "mochi-strawberry.png" { param($g) Draw-Mochi $g "Mochi Strawberry" "#ffc3d8" "#f0337f" }
New-ProductCanvas "hello-kitty-gummies.png" { param($g) Draw-Pouch $g "HELLO KITTY" "Gummies" "#ff91c4" "#17a4ff" }
New-ProductCanvas "ramune-strawberry.png" { param($g) Draw-Bottle $g "Ramune" "#86d9ff" "#f72a8a" }
New-ProductCanvas "panda-biscuits.png" { param($g) Draw-Can $g "Panda" "#ff8b24" "#17141f" }
New-ProductCanvas "matcha-cubes.png" { param($g) Draw-Box $g "Matcha" "Chocolate cubes" "#b7f300" "#168847" }
New-ProductCanvas "melon-soda.png" { param($g) Draw-Bottle $g "Melon" "#b7f300" "#0c85ff" }
New-ProductCanvas "shrimp-chips.png" { param($g) Draw-Sticks $g "Shrimp Chips" "#ff9f1a" "#f72a8a" }
New-ProductCanvas "dorayaki-cookie.png" { param($g) Draw-Cookie $g "Dorayaki" "#d89743" "#5f351a" }
New-ProductCanvas "tokyo-gift.png" { param($g) Draw-Gift $g "Tokyo Box" "#ffd5e6" "#f72a8a" }
New-ProductCanvas "yuzu-candy.png" { param($g) Draw-Pouch $g "Yuzu" "Candy" "#ffb21f" "#0c85ff" }

New-ProductCanvas "category-cookies.png" { param($g) Draw-Cookie $g "Cookies" "#d89743" "#5f351a" }
New-ProductCanvas "category-chocolate.png" { param($g) Draw-Box $g "Matcha" "Chocolate" "#b7f300" "#168847" }
New-ProductCanvas "category-mochi.png" { param($g) Draw-Mochi $g "Mochi" "#ffc3d8" "#f0337f" }
New-ProductCanvas "category-drinks.png" { param($g) Draw-Bottle $g "Ramune" "#86d9ff" "#f72a8a" }
New-ProductCanvas "category-snacks.png" { param($g) Draw-Sticks $g "Snacks" "#ff9f1a" "#f72a8a" }
New-ProductCanvas "category-gifts.png" { param($g) Draw-Gift $g "Gift" "#ffd5e6" "#f72a8a" }

$hero = New-Object System.Drawing.Bitmap(1160, 760, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$hg = [System.Drawing.Graphics]::FromImage($hero)
$hg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$hg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$hg.Clear([System.Drawing.Color]::Transparent)
$pink = New-Object System.Drawing.SolidBrush(ColorFromHex "#f72a8a")
$lime = New-Object System.Drawing.SolidBrush(ColorFromHex "#b7f300")
$blue = New-Object System.Drawing.SolidBrush(ColorFromHex "#43b8ff")
$orange = New-Object System.Drawing.SolidBrush(ColorFromHex "#ff8b24")
$hg.FillEllipse($pink, 650, 64, 420, 360)
$hg.FillEllipse($lime, 114, 556, 520, 150)
$hg.FillEllipse($blue, 846, 406, 134, 134)
$hg.FillRectangle($orange, 196, 146, 22, 120)
$hg.RotateTransform(28)
$hg.FillRectangle($orange, 320, 0, 18, 116)
$hg.ResetTransform()
$pink.Dispose(); $lime.Dispose(); $blue.Dispose(); $orange.Dispose()
Draw-Box $hg "KitKat" "Matcha" "#159447" "#b7f300"
$hg.TranslateTransform(290, -36)
Draw-Pouch $hg "Pocky" "Strawberry" "#f72a8a" "#ff8b24"
$hg.ResetTransform()
$hg.TranslateTransform(520, 34)
Draw-Bottle $hg "Ramune" "#86d9ff" "#f72a8a"
$hg.ResetTransform()
$hg.TranslateTransform(700, 142)
Draw-Mochi $hg "Mochi" "#ffc3d8" "#f0337f"
$hg.ResetTransform()
$hero.Save((Join-Path $assets "hero-collage.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$hg.Dispose(); $hero.Dispose()

$promo = New-Object System.Drawing.Bitmap(900, 420, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$pg = [System.Drawing.Graphics]::FromImage($promo)
$pg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$pg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$pg.Clear([System.Drawing.Color]::Transparent)
$lime = New-Object System.Drawing.SolidBrush(ColorFromHex "#b7f300")
$pink = New-Object System.Drawing.SolidBrush(ColorFromHex "#f72a8a")
$pg.FillEllipse($lime, 420, 52, 360, 360)
$pg.FillEllipse($pink, 74, 242, 144, 144)
$lime.Dispose(); $pink.Dispose()
$pg.TranslateTransform(180, 0)
Draw-Gift $pg "With love from Japan" "#ffd5e6" "#f72a8a"
$pg.ResetTransform()
$promo.Save((Join-Path $assets "promo-gift.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$pg.Dispose(); $promo.Dispose()

Write-Host "Generated Sakura assets in $assets"
