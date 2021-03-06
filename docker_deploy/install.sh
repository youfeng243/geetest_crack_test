#!/bin/bash

# 生成docker镜像脚本位置 这里是工程根目录路径
build_path=/data/geetest_crack_test
# 生成docker镜像脚本
build_sh_name=build_docker.sh
# docker 镜像保存路径位置
image_path="/data/env/"
mkdir -p ${image_path}
# docker本地文件保存镜像名称
image_name=geetest_docker.image
# docker 镜像本地保存位置以及名称
image_real_path="${image_path}${image_name}"
# docker镜像生成名称
docker_name=geetest_docker


install() {
    echo "开始执行安装, 这里需要root权限.."
    yum remove docker \
                  docker-common \
                  container-selinux \
                  docker-selinux \
                  docker-engine
    yum install -y yum-utils device-mapper-persistent-data lvm2
#    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
#    yum-config-manager --enable docker-ce-edge
#    yum makecache fast
#    yum install -y  docker-ce
    yum install -y docker-ce-17.09.0.ce-1.el7.centos.x86_64.rpm
    groupadd docker
    systemctl restart docker
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

    file_size=`ls -l ${image_real_path} | awk '{ print $5 }'`
    max_size=$((1024*1024*100))
    if [ ${file_size} -lt ${max_size} ]
    then
        rm -rf ${image_real_path}
        echo "镜像大小不正确, 重新编译..."
        build_image
        return 0
    fi

    echo "开始导入镜像.."
    docker load < ${image_real_path}
    echo "镜像导入完成.."
    docker images

    return 1
}



all() {
    echo "all 安装需要root权限, all start"

    # 安装必备软件
    cd ${build_path}/scripts
    sh yum_install.sh

    # 安装squid
    sh build_squid.sh
    cd ${build_path}/docker_deploy/

    # 先判断依赖环境是否已经安装
    pid=`ps -ef | grep dockerd | grep -v grep | awk '{print $2}'`
    if [ -z "${pid}" ]; then
        echo "docker 环境还未安装或运行"
        echo "开始启动或运行"
        install
        echo "启动完成..开始创建镜像.."
        import_image
         # 修正属性
        chown ${user}:${user} -R ${build_path}
        return 0        
    fi

    # 判断镜像是否存在
    docker_exist
    [ $? -eq 1 ] && return 1    
    
    # 镜像不存在开始导入或者创建镜像
    import_image

    # 修正属性
    chown ${user}:${user} -R ${build_path}

    echo "all finish!"
    return 1
}


doc() {
    echo "docker 安装需要root权限, docker start"

    # 安装必备软件
    cd ${build_path}/scripts
    sh yum_install.sh

    # 安装squid
    # sh build_squid.sh
    cd ${build_path}/docker_deploy/

    # 先判断依赖环境是否已经安装
    pid=`ps -ef | grep dockerd | grep -v grep | awk '{print $2}'`
    if [ -z "${pid}" ]; then
        echo "docker 环境还未安装或运行"
        echo "开始启动或运行"
        install
        echo "启动完成..开始创建镜像.."
        import_image
         # 修正属性
        chown ${user}:${user} -R ${build_path}
        return 0
    fi

    # 判断镜像是否存在
    docker_exist
    [ $? -eq 1 ] && return 1

    # 镜像不存在开始导入或者创建镜像
    import_image

    # 修正属性
    chown ${user}:${user} -R ${build_path}
    echo "docker finish!"
    return 1
}

case "$1" in
	all|doc)
  		$1
		;;
	*)
		echo $"Usage: $0 {all|doc}"
		exit 1
esac