# Git

git下载安装：https://git-scm.com/download

常用代码仓库：gitHub（ 地址：https://github.com/ ），码云（地址： https://gitee.com/ ），GitLab （地址： https://about.gitlab.com/ ）

## git相关概念

版本库：前面看到的.git隐藏文件夹就是版本库，版本库中存储了很多配置信息、日志信息和文件版本信息等
工作目录（工作区）：包含.git文件夹的目录就是工作目录，主要用于存放开发的代码
暂存区：.git文件夹中有很多文件，其中有一个index文件就是暂存区，也可以叫做stage。暂存区是一个临时保存修改文件的地方

![](https://img-blog.csdnimg.cn/2020040619284969.png)

Git工作目录下的文件存在两种状态：
untracked 未跟踪（未被纳入版本控制）
tracked 已跟踪（被纳入版本控制）
Unmodified 未修改状态
Modified 已修改状态
Staged 已暂存状态

## git工作原理

Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库

<img src="http://img1.sycdn.imooc.com/59c31e4400013bc911720340.png" />



## .gitignore 

将文件添加至忽略列表（无需git管理）：在工作目录中创建一个名为 .gitignore 的文件（文件名称固定），列出要忽略的文件模式

```bash
# no .a files
*.a
# but do track lib.a, even though you're ignoring .a files above
!lib.a
# only ignore the TODO file in the current directory, not subdir/TODO
/TODO
# ignore all files in the build/ directory
build/
# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt
# ignore all .pdf files in the doc/ directory
doc/**/*.pdf
```



# 常用命令



## 初始化

```bash
#在当前目录新建一个git仓库
$ git init
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
# 下载一个项目和它的整个代码历史
$ git clone [url]
```



## **配置**

```bash
# 显示当前的Git配置
$ git config --list

# 编辑Git配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config --global] [user.name] 
$ git config --global [user.email] 
```



## **增加/删除文件**

```bash
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```



## **代码提交**

```bash
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```



## **分支**

```bash
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 拉取远程分支到本地，并切换到该分支
$ git checkout -b [branch-name](本地分支名称) origin/[branch-name](远程分支名称)

# 将本地分支，推送到远程
$ git push --set-upstream origin [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]
$ git branch --set-upstream-to=origin/feature/official sprint/YSH-official-3915085

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```



## **标签**

```bash
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```



## **查看信息**

```bash
# 显示有变更的文件
$ git status
$ git status -s 使输出信息更加简洁

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```



## **远程同步**

```bash
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 更新远程分支信息
$ git remote update origin --prune

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```



## **撤销**

```bash
# 撤销commit
$ git reset --soft HEAD^

# 撤销commit和add
$ git reset --hard HEAD^

# 恢复工作区文件的修改
$ git checkout -- <file>

# 恢复暂存区的指定文件到工作区
$ git reset HEAD <file>

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```



# git-stash用法

- ## **stash当前修改**

`git stash`会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录。
`git stash`是本地的，不会通过`git push`命令上传到git server上。
实际应用中推荐给每个stash加一个**message**，用于记录版本，使用**`git stash save`**取代**`git stash`**命令。

```bash
$ git stash save "message"
```

- **重新应用缓存的stash**

可以通过 `git stash pop` 命令恢复之前缓存的工作目录，这个指令将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下

```bash
$ git stash pop
```


也可以使用 `git stash apply` 命令，将缓存堆栈中的stash多次应用到工作目录中，但并不删除stash拷贝

```bash
$ git stash apply
```

- **查看现有stash**

可以使用 `git stash list` 命令，可以通过名字指定使用哪个**stash**，默认使用最近的stash（即**stash@{0}**）

```bash
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log
```

- **移除stash**

可以使用 `git stash drop` 命令，后面可以跟着stash名字

```bash
$ git stash list
stash@{0}: WIP on master: 049d078 added the index file
stash@{1}: WIP on master: c264051 Revert "added file_size"
stash@{2}: WIP on master: 21d80a5 added number to log

$ git stash drop stash@{0}
Dropped stash@{0} (364e91f3f268f0900bc3ee613f9f733e82aaed43)

$ git stash clear
删除所有缓存的stash
```

- **从stash创建分支**

可以用来恢复储藏的工作然后在新的分支上继续当时的工作。

```bash
$ git stash branch testchanges
```

- **暂存未跟踪或忽略的文件**

默认情况下，`git stash` 会缓存下列文件：

- 添加到暂存区的修改（**staged changes**）
- Git跟踪的但并未添加到暂存区的修改（**unstaged changes**）

但不会缓存一下文件：

- 在工作目录中新的文件（**untracked files**）
- 被忽略的文件（**ignored files**）

`git stash` 命令提供了参数用于缓存上面两种类型的文件。使用 `-u` 或者`--include-untracked`可以**stash untracked**文件。使用 `-a` 或者 `--all` 命令可以**stash**当前目录下的所有修改

```bash
$ git stash -u 
$ git stash --include-untracked
$ git stash -a
$ git stash -all
```



# git-cherry-pick 用法
