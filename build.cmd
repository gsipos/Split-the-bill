call tsc -p src/client
call tsc -p src/server
call copy "package.json" "built/package.json
call gulp html
