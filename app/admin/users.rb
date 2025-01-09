ActiveAdmin.register User do
  permit_params :email, :password, :expires_at

  # Controller logic to generate random email, password, and expiration
  controller do
    def new
      @user = User.new
      @user.email = generate_random_email
      @user.password = generate_random_password
      @user.expires_at = 1.month.from_now
      new!
    end

    def create
      @user = User.new(permitted_params[:user])
      @user.password ||= generate_random_password
      @user.expires_at ||= 1.month.from_now

      if @user.save
        flash[:notice] = "Email: #{@user.email}, Password: #{@user.password}"
        redirect_to admin_user_path(@user)
      else
        render :new
      end
    end

    def update
      @user = User.find(params[:id])
      if @user.update(permitted_params[:user])
        flash[:notice] = "Email: #{@user.email}, Password: #{@user.password}"
        redirect_to admin_user_path(@user)
      else
        render :edit
      end
    end

    private

    def generate_random_email
      loop do
        email = "#{SecureRandom.hex(5)}@nightrabbit.com"
        break email unless User.exists?(email: email)
      end
    end

    def generate_random_password
      SecureRandom.alphanumeric(12)
    end
  end

  # Form to create new users in admin panel
  form do |f|
    f.inputs 'User Details' do
      f.input :email, input_html: { value: f.object.email }
      f.input :password, input_html: { value: f.object.password }
      f.input :expires_at, as: :datepicker, input_html: { value: f.object.expires_at }
    end
    f.actions
  end

  # Show page to display user details after creation
  show do
    attributes_table do
      row :email
      row :expires_at
      row :created_at
      row :password do
        flash[:notice].match(/Password: (.+)/)[1] rescue 'N/A'
      end
    end
  end

  index do
    selectable_column
    id_column
    column :email
    column :expires_at
    column :created_at
    actions
  end

  # Copy credentials with a button
  sidebar "Copy Credentials", only: :show do
    if flash[:notice].present?
      div do
        strong flash[:notice]
        button "Copy", onclick: "copyToClipboard('#{flash[:notice]}')", style: "margin-left: 10px;"
      end
      script do
        raw <<-JS
          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(function() {
              alert('Credentials copied to clipboard!');
            }, function(err) {
              alert('Failed to copy credentials.');
            });
          }
        JS
      end
    end
  end
end
