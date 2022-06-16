# Terminates the program (like Ctrl+C)
kill -INT $(pgrep docker-compose)

# Terminates docker processes
docker stop $(docker ps -q)
