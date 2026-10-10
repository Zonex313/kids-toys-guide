@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo 正在启动本地网页服务…
echo 请用浏览器打开： http://127.0.0.1:8765/
echo 关闭本窗口即可停止服务。
echo.
where python >nul 2>&1
if %errorlevel%==0 (
  python -m http.server 8765
) else (
  where py >nul 2>&1
  if %errorlevel%==0 (
    py -3 -m http.server 8765
  ) else (
    echo 未找到 Python。你也可以直接双击打开 index.html（现已支持）。
    pause
  )
)
