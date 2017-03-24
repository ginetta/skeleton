=begin
Capistrano deployment email notifier for Rails 3

Do you need to send email notifications after application deployments?

Christopher Sexton developed a Simple Capistrano email notifier for rails. You can find details at http://www.codeography.com/2010/03/24/simple-capistrano-email-notifier-for-rails.html.

Here is Rails 3 port of the notifier.

The notifier sends an email after application deployment has been completed.

How to use it?

 1. Add this file to config/deploy folder.
 2. Update the file with your google credentials and from email address.
 3. Add the following content to config/deploy.rb.

    require 'config/deploy/cap_notify.rb'

    # add email addresses for people who should receive deployment notifications
    set :notify_emails, ['EMAIL1@YOURDOMAIN.COM', 'EMAIL2@YOURDOMAIN.COM']

    after :deploy, 'deploy:send_notification'

    # Create task to send a notification
    namespace :deploy do
      desc 'Send email notification'
      task :send_notification do
        Notifier.deploy_notification(self).deliver
      end
    end

 4. Update deploy.rb with destination email addresses for the notifications.
 5. To test run this command:

    cap deploy:send_notification
    bundle exec cap production deploy:send_notification

=end

require 'action_mailer'

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :enable_starttls_auto => false,
  :tls => false,
  :ssl => true,
  :address => '',
  :port => 465,
  :domain => '',
  :authentication => '',
  :user_name => '',
  :password => ''
}

class Notifier < ActionMailer::Base
  default :from => ''
  def deploy_notification(cap_vars)
    now = Time.now

    mail(:to => fetch(:cap_notify_emails),
      :subject => "") do |format|
      format.text { render :text => msg}
      format.html { render :text => "<p>" + msg + "<\p>"}
    end
  end
end
