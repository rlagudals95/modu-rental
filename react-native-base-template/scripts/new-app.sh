#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: ./scripts/new-app.sh <app-name> [target-dir]"
  exit 1
fi

APP_NAME_RAW="$1"
TARGET_DIR="${2:-../apps}"

slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

SLUG="$(slugify "$APP_NAME_RAW")"
if [[ -z "$SLUG" ]]; then
  echo "Invalid app name: $APP_NAME_RAW"
  exit 1
fi

PKG_NAME="rn-${SLUG}"
SCHEME="${SLUG//-/}"
OUT_DIR="${TARGET_DIR}/${SLUG}"

mkdir -p "$TARGET_DIR"
if [[ -e "$OUT_DIR" ]]; then
  echo "Target already exists: $OUT_DIR"
  exit 1
fi

rsync -a \
  --exclude node_modules \
  --exclude .expo \
  --exclude .git \
  --exclude .DS_Store \
  ./ "$OUT_DIR/"

node -e '
const fs=require("fs");
const path=require("path");
const appDir=process.argv[1];
const appName=process.argv[2];
const slug=process.argv[3];
const pkgName=process.argv[4];
const scheme=process.argv[5];

const pkgPath=path.join(appDir,"package.json");
const appJsonPath=path.join(appDir,"app.json");

const pkg=JSON.parse(fs.readFileSync(pkgPath,"utf8"));
pkg.name=pkgName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg,null,2)+"\n");

const appJson=JSON.parse(fs.readFileSync(appJsonPath,"utf8"));
appJson.expo.name=appName;
appJson.expo.slug=slug;
appJson.expo.scheme=scheme;
appJson.expo.ios = appJson.expo.ios || {};
appJson.expo.ios.bundleIdentifier = `com.yourcompany.${slug.replace(/-/g,"")}`;
appJson.expo.android = appJson.expo.android || {};
appJson.expo.android.package = `com.yourcompany.${slug.replace(/-/g,"")}`;
fs.writeFileSync(appJsonPath, JSON.stringify(appJson,null,2)+"\n");
' "$OUT_DIR" "$APP_NAME_RAW" "$SLUG" "$PKG_NAME" "$SCHEME"

cat <<EOF
✅ Created app: $OUT_DIR

Next steps:
1) cd "$OUT_DIR"
2) cp .env.example .env
3) npm install
4) npx expo start --ios

Remember to update:
- app.json: ios.bundleIdentifier / android.package
- .env: EXPO_PUBLIC_API_BASE_URL
EOF
