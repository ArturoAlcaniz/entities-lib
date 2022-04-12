#!/bin/bash

awesomedomain=tishoptfg.com
dockerport=tishoptfg.com

## cert info
CAfilename=arturo
bitsStrong=8192
CountryName=ES
StateOrProvinceName=Spain
LocalityName=Spain
OrganizationName=tishoptfg.com
OrganizationalUnitName=tishoptfg.com
CommonName=tishoptfg.com
EmailAddress=tishoptfg@gmail.com

if [ ! -d "sslcache" ]; then
  mkdir sslcache
fi

cd sslcache

if [ ! -f $CAfilename.pem ]; then

    ## generating a root certificate
    openssl genrsa -des3 -out $CAfilename.key $bitsStrong
    openssl req -x509 \
    -new -nodes \
    -key $CAfilename.key \
    -sha256 -days 3650 \
    -out $CAfilename.pem \
    -subj "/C=$CountryName/ST=$StateOrProvinceName/L=$LocalityName/O=$OrganizationName/OU=$OrganizationalUnitName/CN=$CommonName"

fi


## generate private key
openssl genrsa -out $awesomedomain.key $bitsStrong

## generate a certificate signing Request for $awesomedomain
openssl req -new \
  -key $awesomedomain.key \
  -out $awesomedomain.csr \
  -subj "/C=$CountryName/ST=$StateOrProvinceName/L=$LocalityName/O=$OrganizationName/OU=$OrganizationalUnitName/CN=$CommonName"

OUT=$awesomedomain.ext
cat <<EOF >$OUT
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $awesomedomain
EOF

## create DA SIGNED CERTIFICATE
openssl x509 -req -in $awesomedomain.csr \
  -CA $CAfilename.pem \
  -CAkey $CAfilename.key \
  -CAcreateserial \
  -out $awesomedomain.crt \
  -days 3650 \
  -sha256 \
  -extfile $awesomedomain.ext

mkdir $awesomedomain
mv $awesomedomain.* $awesomedomain/ 

cd /etc/nginx/

NOW=$(date +%Y-%m-%d-%H.%M.%S)
cp /etc/hosts /etc/hosts_backup_$NOW
sed -i  "1s/^/127.0.0.1    ${awesomedomain}\n/" /etc/hosts

#service nginx reload

echo "done :), import  /etc/nginx/sslcache/$CAfilename.pem  and go to  https://$awesomedomain/" 