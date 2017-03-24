#
# a Makefile for node based vhosts
#

include .env

all:

#
# NDEPLOY
#
ndeploy_stage:
	bundle exec cap -n staging deploy

ndeploy_prod:
	bundle exec cap -n production deploy

#
# DEPLOY
#
deploy_stage:
	bundle exec cap staging deploy

deploy_prod:
	bundle exec cap production deploy
	# bundle exec cap -z node-x.foo.ch production deploy

#
# DEPLOY ROLLBACK
#
deploy_stage_rollback:
	bundle exec cap staging deploy:rollback

deploy_prod_rollback:
	bundle exec cap production deploy:rollback
