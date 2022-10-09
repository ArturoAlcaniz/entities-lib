# Delete database
rm -r mariadb/

# Delete images
rm -r ProductsService/files/
rm -r UsersService/files/

# Delete Logs
rm -r ProductsService/log/
rm -r UsersService/log/
rm -r MailerService/log/
rm -r error/

# Delete node modules
rm -r ProductsService/node_modules/
rm -r UsersService/node_modules/
rm -r MailerService/node_modules/
rm -r TFG-Frontend/node_modules/
