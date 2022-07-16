FROM node:14
WORKDIR /spa
ADD package.json ./package.json
ADD public ./public
ADD scripts ./scripts
ADD src ./src
ENV CYPRESS_INSTALL_BINARY=0

# When the SPA is running locally the API requests are proxied to the same machine,
# but in Docker Compose the API is running on a different container, so we have to
# rewrite the URL for the API front-end.
RUN sed -i 's/localhost:3001/api-front:3001/g' package.json

RUN npm install
CMD ["npm", "start"]