#!/bin/bash

# 生成docker镜像脚本位置 这里是工程根目录路径
build_path=/home/work/apps/geetest_crack_test
# 生成docker镜像脚本
build_sh_name=build_docker.sh
# 需要加入docker组的用户
user=work
# docker 镜像保存路径位置
image_path="/home/${user}/env/"
mkdir -p ${image_path}
# docker本地文件保存镜像名称
image_name=geetest_docker.image
# docker 镜像本地保存位置以及名称
image_real_path="${image_path}${image_name}"
# docker镜像生成名称
docker_name=geetest_docker


install() {
    echo "开始执行安装, 这里需要root权限.."
    sudo yum remove docker \
                  docker-common \
                  container-selinux \
                  docker-selinux \
                  docker-engine
    sudo yum install -y yum-utils
    sudo yum-config-manager --add-repo  https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum makecache fast
    sudo yum install -y  docker-ce
    sudo groupadd docker
    sudo gpasswd -a ${user} docker
    sudo systemctl restart docker
}

docker_exist() {
    echo "判断镜像是否已经存在..."
    id=`docker images | grep "${docker_name}"`
    if [ -z "${id}" ]; then
        echo "${docker_name} 还未生成, 不存在.."
        return 0
    fi
    echo "${docker_name}已经存在.."
    return 1
}

build_image() {
    echo "开始编译镜像"

    # 判断路径是否存在
    if [ ! -d "${build_path}" ]; then
        echo "路径不存在: ${build_path}"
        return 0
    fi

    cd ${build_path}
    echo "当前目录: `pwd`"
    if [ ! -r "`pwd`/${build_sh_name}" ]; then
        echo "编译脚本${build_sh_name}不存在"
        return 0
    fi
    
    echo "开始编译镜像.."
    sh ${build_sh_name}
    echo "编译完成..."

    echo "保存镜像到 -> ${image_path}${image_name}"
    if [ ! -w "${image_path}" ]; then
        echo "error: 当前路径没有写入权限: ${image_path}"
        return 0
    fi

    docker save ${docker_name} > ${image_path}${image_name}
    echo "镜像保存完成..."

     # 修正属性
    chown ${user}:${user} -R ${image_real_path}

    docker images

    return 1
}

import_image () {
    echo "image_real_path = ${image_real_path}"
    if [ ! -r "${image_real_path}" ]; then
        echo "镜像不存在, 重新编译..."
        build_image
        return 0
    fi
    echo "开始导入镜像.."
    docker load < ${image_real_path}
    echo "镜像导入完成.."
    docker images

    return 1
}



auto_install() {
    echo "auto_install start"
    echo "5秒后开始docker环境安装...如需中断请Ctrl+C..."
    sleep 5
        
    # 先判断依赖环境是否已经安装
    pid=`ps -ef | grep dockerd | grep -v grep | awk '{print $2}'`
    if [ -z "${pid}" ]; then
        echo "docker 环境还未安装或运行"
        echo "开始启动或运行"
        install
        echo "启动完成..开始创建镜像.."
        import_image
        return 0        
    fi

    # 判断镜像是否存在
    docker_exist
    [ $? -eq 1 ] && return 1    
    
    # 镜像不存在开始导入或者创建镜像
    import_image

    echo "auto_install finish!"
    return 1
}


auto_install
echo "完成docker环境安装完成.."



