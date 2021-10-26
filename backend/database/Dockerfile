FROM postgres:12.5-alpine

# must not be used
ENV POSTGRES_USER="hiroki"
ENV POSTGRES_DB="appdb"
ENV POSTGRES_PASSWORD="pass"

# / must not be used

USER postgres
COPY ./init/*.sql docker-entrypoint-initdb.d/

CMD ["postgres"]