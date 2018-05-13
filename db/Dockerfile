FROM postgres:alpine

COPY 1-init.sql /docker-entrypoint-initdb.d/
COPY 2-init-data.sql /docker-entrypoint-initdb.d/

