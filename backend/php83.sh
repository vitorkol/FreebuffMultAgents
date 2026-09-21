#!/usr/bin/env bash
# Wrapper PHP 8.3 do projeto.
# Usa o php8.3 do sistema (/usr/bin/php8.3) + extensões empacotadas em php-extensions/,
# sem necessidade de instalar pacotes ou usar sudo.
# Ordem do PHP_INI_SCAN_DIR importa: o conf.d do sistema carrega pdo.so ANTES do
# conf.d do projeto carregar pdo_sqlite.so (evita "undefined symbol: php_pdo_unregister_driver").
# Uso: ./php83.sh artisan ... | ./php83.sh -v | ./php83.sh script.php
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export LD_LIBRARY_PATH="$ROOT/php-extensions/root/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export PHP_INI_SCAN_DIR="/etc/php/8.3/cli/conf.d:$ROOT/php-extensions/conf.d"

exec /usr/bin/php8.3 "$@"
