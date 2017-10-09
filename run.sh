#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

project_name=geetest_crack_test
image_name='geetest_docker'
image_path="/data/env/${image_name}.image"
project_path=`pwd`

image_exist() {
    docker_pid=`docker images | grep "${image_name}" | awk '{print $1}'`
    if [ -z "${docker_pid}" ]; then
        return 0
    fi

    return 1
}

start(){
    status
    [ $? -eq 1 ] && return 1
    echo $"Starting $project_name ... "

    # 判断docker镜像是否已经存在docker容器中
    image_exist
    if [ $? -eq 0 ]; then
        # 导入镜像
        docker load < ${image_path}
    fi

    image_exist
    if [ $? -eq 0 ]; then
        echo "镜像不存在, 导入失败..."
        return 0
    fi

    # 先删除已存在容器
    stop

    echo '重启squid..'
    cd ${DIR}/scripts
    sh squid_control.sh reload

    echo '开始启动docker服务'
    docker run -d --net=host -p 3000:3000 --name="${project_name}" -v ${project_path}:/${project_name} -it ${image_name}
    echo '等待启动完成...'
    sleep 13
    docker ps -a
    status
    echo '启动完成'
}

stop(){
    echo "Stopping ${project_name} ... "
    docker stop ${project_name}
    docker rm ${project_name}

    echo "停止squid"
    cd ${DIR}/scripts
    sh squid_control.sh stop

    status
}

status(){
    
    conid=`docker ps -a | grep "${project_name}" | grep 'Up' |  awk '{print $1}'`
    if [ -z "$conid" ]; then
        echo "${project_name} is not Running!"
        return 0
    fi
    docpid=`ps -ef | grep docker | grep -v grep | awk '{print $2}'`
    if [ -z "$docpid" ]; then
        echo "docker is not Running!"
        return 0
    fi
    
    node_status=`curl -I -m 10 -o /dev/null -s -w %{http_code} 127.0.0.1:3000`
    if [ ! ${node_status} -eq 404 ]; then
        echo "访问127.0.0.1:3000失败.."
        return 0
    fi
     
    pid=`ps -ef | grep ${conid} | grep -v grep | awk '{print $2}'`
    
    echo ${pid}
    return 1
    
#    Pid=`docker ps -a | grep "${project_name}" | grep 'Up' |  awk '{print $1}'`
#    [ -z "$Pid" ] && echo "${project_name} is not Running!" && return 0
#    [ -n "$Pid" ] && echo "$Pid" && return 1
}

restart() {
    stop
    sleep 3
    start
}

case "$1" in
    start|stop|restart|status)
        $1
        ;;
    *)
    echo $"Usage: sh $0 {start|stop|restart|status}"
    exit 1
esac

