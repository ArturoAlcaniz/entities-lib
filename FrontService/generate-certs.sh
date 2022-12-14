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
EmailAddress=admin@tishoptfg.com
PASSPHRASE=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 10)

if [ ! -d "sslcache" ]; then
  mkdir sslcache
fi

cd sslcache

if [ ! -f $CAfilename.pem ]; then

    ## generating a root certificate
    openssl genrsa -des3 -out $CAfilename.key -passout pass:$PASSPHRASE $bitsStrong
    openssl req -x509 \
    -new -nodes \
    -key $CAfilename.key \
    -sha256 -days 3650 \
    -out $CAfilename.pem \
    -passin pass:$PASSPHRASE \
    -subj "/C=$CountryName/ST=$StateOrProvinceName/L=$LocalityName/O=$OrganizationName/OU=$OrganizationalUnitName/CN=$CommonName"

fi

## generate private key
openssl genrsa -out $awesomedomain.key $bitsStrong

## generate a certificate signing Request for $awesomedomain
openssl req -new \
  -key $awesomedomain.key \
  -out $awesomedomain.csr \
  -passin pass:$PASSPHRASE \
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
  -passin pass:$PASSPHRASE \
  -days 3650 \
  -sha256 \
  -extfile $awesomedomain.ext

mkdir $awesomedomain
mv $awesomedomain.* $awesomedomain/ 

echo "Certificates sucessfully generated" 