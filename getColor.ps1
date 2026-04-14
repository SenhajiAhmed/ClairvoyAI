Add-Type -AssemblyName System.Drawing
$img = New-Object System.Drawing.Bitmap "C:\Users\ahmed\Desktop\ClairvoyAI\shadcn\public\exploded_eye\ezgif-frame-001.jpg"
$pixel = $img.GetPixel(0, 0)
Write-Output "$($pixel.R), $($pixel.G), $($pixel.B)"
