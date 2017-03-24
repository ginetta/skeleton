set :application, 'gientta-skeleton'
set :repo_url, 'git@github.com:ginetta/skeleton.git'
set :default_env, { path: "/usr/local/bin:$PATH" }

set :keep_releases, 2

set :nc_terminal, 'com.googlecode.iterm2'

set :cap_notify_emails, [ 'tech@ttss.ch' ]
set :cap_notify_from, 'support@ginetta.net'
set :cap_notify_callsign, 'GINETTA'
set :cap_notify_latest_commit, proc { `git rev-parse HEAD`.strip }

# ttss channel
# set :slack_webhook, "https://hooks.slack.com/services/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"
# ginetta channel
set :slack_webhook, "https://hooks.slack.com/services/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"

# Maybe required for restarting memcached but fails
# set :pty, true

# Branch options
# Prompts for the branch name (defaults to current branch)
#ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Sets branch to current one
#set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

# Hardcodes branch to always be master
# This could be overridden in a stage config file
set :branch, :master

set :deploy_to, -> { "/var/www/vhosts/#{fetch(:application)}" }

set :log_level, :info
# set :log_level, :debug

# set :linked_files, %w{.env web/.htaccess}
set :linked_files, %w{.env}
# set :linked_dirs, %w{web/app/uploads web/app/ewww}

namespace :deploy do
  desc "Installs npm dependencies"
  task :npm_install, :roles => :app, :except => { :no_release => true } do
    run "npm install"
  end

  desc "Build source code into static assets"
  task :npm_build, :roles => :app, :except => { :no_release => true } do
    run "npm run build"
  end
end

# by default it only installs dependencies. We remove the --production flag
# so it also installs devDependencies
set :npm_flags, '--silent --no-progress'


after :deploy, 'deploy:send_notification'
before 'deploy', 'deploy:npm_install'
before 'deploy', 'deploy:npm_build'
# after 'deploy:finishing', 'deploy:update_wp_translations'
# after 'deploy:publishing', 'memcached:restart'
