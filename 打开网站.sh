#!/usr/bin/env bash
cd "$(dirname "$0")"
echo ""
echo "正在启动本地网页服务…"
echo "请用浏览器打开： http://127.0.0.1:8765/"
echo "按 Ctrl+C 可停止服务。"
echo ""
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 8765
elif command -v python >/dev/null 2>&1; then
  python -m http.server 8765
else
  echo "未找到 Python。你也可以直接双击打开 index.html（现已支持）。"
  exit 1
fi
