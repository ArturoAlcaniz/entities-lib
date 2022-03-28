if [ "$1" == "test" ]; then
    docker rm -f $(docker ps -a -q)
    docker volume rm $(docker volume ls -q)
    docker-compose -f docker-compose.test.yml up
else
    if [ "$1" == "" ]; then
        docker rm -f $(docker ps -a -q)
        docker volume rm $(docker volume ls -q)
        docker-compose up
    else
        echo "Argumento incorrecto. Uso: bash Start_system.sh or bash Start_system.sh test"
    fi
fi
