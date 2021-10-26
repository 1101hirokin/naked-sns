FROM alpine:3.14.2

ARG phpversion="8.0.12-r0"

RUN apk update --update
RUN apk --no-cache add php8=${phpversion} \
  php8-ctype \
  php8-curl \
  php8-dom \
  php8-exif \
  php8-fileinfo \
  php8-fpm \
  php8-gd \
  php8-iconv \
  php8-intl \
  php8-mbstring \
  php8-mysqli \
  php8-opcache \
  php8-openssl \
  php8-pecl-imagick \
  php8-pecl-redis \
  php8-phar \
  php7-session \
  php8-simplexml \
  php8-soap \
  php8-xml \
  php8-xmlreader \
  php8-zip \
  php8-zlib \
  php8-pdo \
  php8-xmlwriter \
  php8-tokenizer \
  php8-pdo_pgsql \
  nginx supervisor curl tzdata htop postgresql-client dcron sudo

RUN php8 -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php8 composer-setup.php --install-dir=/usr/local/bin --filename=composer

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/fpm-pool.conf /etc/php8/php-fpm.d/www.conf
COPY conf/php.ini /etc/php8/conf.d/custom.ini
COPY conf/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/www/laraapp
RUN chmod o+x /var/www/laraapp/

RUN chown -R nobody.nobody /var/www/laraapp && \
  chown -R nobody.nobody /run && \
  chown -R nobody.nobody /var/lib/nginx && \
  chown -R nobody.nobody /var/log/nginx

USER nobody

WORKDIR /var/www/laraapp
COPY --chown=nobody project/ /var/www/laraapp/

RUN php8 artisan key:generate

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]