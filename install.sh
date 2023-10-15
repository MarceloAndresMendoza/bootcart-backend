#!/bin/bash
echo "================================================="
echo "This script will install BootCart server program"
echo "================================================="

# Check if node.js is installed
if ! [ -x "$(command -v node)" ]; then
    echo "====================================================" >&2
    echo "CRITICAL ERROR: node.js is not installed." >&2
    echo "Install it via npm. " >&2
    echo "https://github.com/nvm-sh/nvm" >&2
    echo "====================================================" >&2
    exit 1
fi

# Specify the source directory of the node.js app
SOURCE_DIR="./"

# Specify the target directory where the app will be copied and run
TARGET_DIR="/opt/bootcart"

# Get node path on PATH env
NODE_PATH=$(which node | grep 'node')

# Get the current username
CURRENT_USER=$(whoami)
CURRENT_GROUP=$(id -gn)

# Check if the env file exists
if [ -f "$TARGET_DIR/.env" ]; then
    # Update the program
    echo "Program already installed, updating..."
    # Copy your app files to the target directory
    echo "Copying files..."
    sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"
    # Navigate to the target directory
    cd "$TARGET_DIR"
    sudo chown -R $CURRENT_USER:$CURRENT_GROUP .

    # Install your app's dependencies (if needed)
    echo "Installing dependencies..."
    npm install
    # Restart the service
    echo "Restarting the service..."
    sudo systemctl restart bootcart
    sudo systemctl status bootcart
    echo "Update finished."
else
    # Copy your app files to the target directory
    echo "Copying files..."
    sudo mkdir -p "$TARGET_DIR"
    sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"
    # Navigate to the target directory
    cd "$TARGET_DIR"
    sudo chown -R $CURRENT_USER:$CURRENT_GROUP .

    # Install your app's dependencies (if needed)
    echo "Installing dependencies..."
    npm install

    # Create the .env file
    echo "Creating the .env file..."
    sudo touch "$TARGET_DIR/.env"
    # echo "PORT=3000" | sudo tee -a "$TARGET_DIR/.env"
    read -p "Enter the port number: " PORT
    read -p "Enter the database name: " DB_NAME
    read -p "Enter the database username: " DB_USER
    read -p "Enter the database password: " DB_PASSWORD
    read -p "Enter the database host: " DB_HOST
    read -p "Enter the database port: " DB_PORT
    DBURI="mongodb://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?authMechanism=DEFAULT"
    DBSTATUSURL="http://$DB_HOST:$DB_PORT"
    read -p "Enter the secret key: " SECRET_KEY
    read -p "Enter Sunbeam's URL: (http://rweb.cl:48299/api/v1) " SUNBEAM_URL
    read -p "Enter Sunbeam's API key: " SUNBEAM_API_KEY
    read -p "Enter Nodemailer URL: (http://mailer.doblefoco.cl/mailer) " NODEMAILER_URL
    read -p "Enter Nodemailer API key: " NODEMAILER_API_KEY
    read -p "Enter the authentication timeout (in minutes '3600'): " AUTH_TIMEOUT
    read -p "Enter this server's API Endpoint version (/api/v1)" API_VERSION

    # Generate the configuration file '.env'
    cat << EOF > .env
    # Configuration file generated on install.
    PORT=$PORT
    DBURI=$DBURI
    DBSTATUSURL=$DBSTATUSURL
    SECRET_KEY=$SECRET_KEY
    SUNBEAM_URL=$SUNBEAM_URL
    SUNBEAM_API_KEY=$SUNBEAM_API_KEY
    NODEMAILER_URL=$NODEMAILER_URL
    NODEMAILER_API_KEY=$NODEMAILER_API_KEY
    AUTH_TIMEOUT=$AUTH_TIMEOUT
    API_VERSION=$API_VERSION
EOF

    # Generate the service file
    echo "Generating the service file..."
    echo "[Unit]
Description=BootCart server backend
After=network.target

[Service]
Type=simple
User=$CURRENT_USER
Group=$CURRENT_GROUP
WorkingDirectory=$TARGET_DIR
ExecStart=$NODE_PATH $TARGET_DIR/index.js
Restart=always

[Install]
WantedBy=multi-user.target" > bootcart.service

    # Create a systemd service file
    echo "Creating a systemd service file..."
    sudo cp bootcart.service /etc/systemd/system/bootcart.service
    sudo systemctl daemon-reload
    sudo systemctl enable bootcart
    sudo systemctl start bootcart
    sudo systemctl status bootcart
fi

echo "===================================================="
echo "Installation finished."
echo "Check the above result of the service status."
echo "===================================================="
echo If everything is ok, you can safely delete the folder
echo where this script is located: $TARGET_DIR
echo - To stop the service: systemctl stop bootcart
echo - To disable the service: systemctl disable bootcart
echo - Installation location: $TARGET_DIR
echo "===================================================="