GITHUB_USER=meg768
GITHUB_PROJECT=web-server
GITHUB_URL=https://github.com/$(GITHUB_USER)/$(GITHUB_PROJECT)

all:
	@echo Specify something

git-commit:
	git add -A && git commit -m '-' && git push

git-pull:
	git pull

git-reset:
	git reset --hard HEAD

goto-github:
	open $(GITHUB_URL).git

npm-publish:
	npm publish
