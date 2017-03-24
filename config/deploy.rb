# config valid only for current version of Capistrano
lock "3.8.0"

set :application, "ginetta-skeleton"
set :repo_url, 'git@github.com:ginetta/skeleton.git'

set :nc_terminal, 'com.googlecode.iterm2'

# set :file_permissions_paths, [ ]
# set :file_permissions_groups, ["www-data"]

# set :cap_notify_emails, [ 'tech@ttss.ch' ]
# set :cap_notify_from, 'deploy@frontal.ch'
# set :cap_notify_callsign, 'EXAMPLE'
# set :cap_notify_latest_commit, proc { `git rev-parse HEAD`.strip }

set :slackistrano, {
    channel: '#s-ginetta-ttss',
    webhook: 'https://hooks.slack.com/services/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'
}

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, -> { "/var/www/vhosts/#{fetch(:application)}" }

# set :log_level, :info
set :log_level, :debug

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"
# set :linked_files, %w{.env web/.htaccess}

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
# set :linked_dirs, %w{web/app/uploads web/app/ewww}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :default_env, { path: "/usr/local/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 2

# before "deploy:updated", "deploy:set_permissions:acl"

# namespace :deploy do
#     desc "Send email notification"
#         task :send_notification do
#             Notifier.deploy_notification(self).deliver_now
#     end
# end
#
# after :deploy, 'deploy:send_notification'
