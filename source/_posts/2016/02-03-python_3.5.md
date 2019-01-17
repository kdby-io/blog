---
title: Python 3.5 개발환경 세팅
tag: python
---
## Install Python 3.5

## Install Python Development Packages
```
$ sudo apt-get python3.5-dev
```

## Setup pip
```
$ curl -O https://bootstrap.pypa.io/get-pip.py
$ python3.5 get-pip.py
```

## Setup Virtual Environment
```
$ pip3.5 install virtualenv virtualenvwrapper
```

add the lines to `~/.profile` or `~/.bashrc`

```
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3.5
export WORK_ON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/Dropbox/code
source /usr/local/bin/virtualenvwrapper.sh
```

`$ source ~/.bashrc` to reload

## Dependencies of Python Modules

#### pillow
```
$ sudo apt-get install libjpeg-dev
```

#### mysqlclient
```
$ sudo apt-get install libmysqlclient-dev
```
