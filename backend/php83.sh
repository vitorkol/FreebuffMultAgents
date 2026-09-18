#!/usr/bin/env bash
# Wrapper PHP 8.3 do projeto.
# Usa o binário php8.3 e carrega extensões extraídas localmente (backend/php-extensions),
# sem exigir root nem alterar o PHP padrão do sistema.
# Uso: ./php83.sh <comando...>   (ex.: ./php83.sh artisan migrate)
#      ./php83.sh composer install
#      ./php83.sh vendor/bin/phpunit

set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXTROOT="$PROJECT_ROOT/backend/php-extensions"
EXTDIR="$EXTROOT/root/usr/lib/php/20230831"

# Gera ini com caminhos absolutos (idempotente)
cat > "$EXTROOT/conf.d/90-project-ext.ini" <<EOF
; Gerado por backend/php83.sh — não editar
extension=$EXTDIR/mbstring.so
extension=$EXTDIR/curl.so
extension=$EXTDIR/dom.so
extension=$EXTDIR/xml.so
extension=$EXTDIR/simplexml.so
extension=$EXTDIR/xmlwriter.so
extension=$EXTDIR/xmlreader.so
extension=$EXTDIR/sqlite3.so
extension=$EXTDIR/pdo_sqlite.so
extension=$EXTDIR/zip.so
EOF

export PHP_INI_SCAN_DIR="/etc/php/8.3/cli/conf.d:$EXTROOT/conf.d"
export LD_LIBRARY_PATH="$EXTROOT/root/usr/lib/x86_64-linux-gnu:${LD_LIBRARY_PATH:-}"

if [ "${1:-}" = "composer" ]; then
  shift
  exec php8.3 /usr/bin/composer "$@"
else
  exec php8.3 "$@"
fi
