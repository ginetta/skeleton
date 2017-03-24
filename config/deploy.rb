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

set :linked_files, %w{.env web/.htaccess}
set :linked_dirs, %w{web/app/uploads web/app/ewww}

namespace :deploy do
    desc "Send email notification"
        task :send_notification do
            Notifier.deploy_notification(self).deliver_now
    end

    desc 'Update WordPress translations'
	task :update_wp_translations do
        on roles(:app) do
            within fetch(:release_path) do
                execute "wp core language update --path='#{fetch(:release_path)}/web/wp' --debug"
            end
        end
    end
end


set :npm_target_path, -> { release_path.join('subdir') } # default not set
set :npm_flags, '--silent --no-progress'    # default
set :npm_roles, :all                                     # default
set :npm_env_variables, {}                               # default

after :deploy, 'deploy:send_notification'
# after 'deploy:finishing', 'deploy:update_wp_translations'
# after 'deploy:publishing', 'memcached:restart'
