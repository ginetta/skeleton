#
# a Makefile for node based vhosts
#

include .env

all:

#
# NDEPLOY
#
ndeploy_stage:
	cap -n staging deploy

ndeploy_prod:
	cap -n production deploy

#
# DEPLOY
#
deploy_stage:
	cap staging deploy

deploy_prod:
	cap production deploy
	# cap -z node-x.foo.ch production deploy

#
# DEPLOY ROLLBACK
#
deploy_stage_rollback:
	cap staging deploy:rollback

deploy_prod_rollback:
	cap production deploy:rollback
